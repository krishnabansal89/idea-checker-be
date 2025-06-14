import json
from langchain_openai import AzureOpenAIEmbeddings
from langchain_core.documents import Document
from typing import List
import logging
from azure.cosmos import CosmosClient, PartitionKey
# from langchain_community.vectorstores.azure_cosmos_db_no_sql import (
#     AzureCosmosDBNoSqlVectorSearch,
# )
from langchain_azure_ai.vectorstores import (
    AzureCosmosDBNoSqlVectorSearch,
)
from config import config
from langchain_community.vectorstores.azure_cosmos_db_no_sql import CosmosDBQueryType
from openai import AzureOpenAI
from policies import full_text_policy , indexing_policy , vector_embedding_policy

class Services:
    def __init__(self , batch_size: int = 100, max_workers: int = 2 , logger: logging.Logger = None):

        
        self.openAIChatConnection = AzureOpenAI(
                azure_endpoint=config.AZURE_OPENAI_ENDPOINT,
                api_version="2024-12-01-preview",
                api_key=config.AZURE_OPENAI_API_KEY
            )
        self.logger = logger if logger else logging.getLogger(__name__)
        self.batch_size = batch_size
        self.max_workers = max_workers
        self.HOST = config.COSMOS_DB_ENDPOINT
        self.KEY = config.COSMOS_DB_KEY
        self.cosmos_client = CosmosClient(self.HOST, self.KEY)
        self.database_name = "idea-directory"
        self.container_name = "startups"
        self.partition_key = PartitionKey(path="/id")
        self.cosmos_container_properties = {"partition_key": self.partition_key}
        self.embeddings = AzureOpenAIEmbeddings(
                model="text-embedding-3-small",
                deployment="text-embedding-3-small",
                api_version="2024-12-01-preview",
                azure_endpoint= config.AZURE_OPENAI_EMBEDDINGS_ENDPOINT,
                api_key= config.AZURE_OPENAI_EMBEDDINGS_API_KEY
            )
        self.cosmoDb = AzureCosmosDBNoSqlVectorSearch(
                vector_search_fields= {"text_field": "text", "embedding_field": "embedding"}, 
                search_type=CosmosDBQueryType.HYBRID,
                embedding=self.embeddings,
                cosmos_client=self.cosmos_client,
                database_name=self.database_name,
                container_name=self.container_name,
                vector_embedding_policy=vector_embedding_policy,
                full_text_policy=full_text_policy,
                indexing_policy=indexing_policy,
                cosmos_container_properties=self.cosmos_container_properties,
                cosmos_database_properties={},
                full_text_search_enabled=True,
            )
        
    async def DistilLayer(self, query: str) -> str:
        """Coincise the user query to a more manageable form"""

        response = self.openAIChatConnection.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": """Formatting re-enabled - please output structured JSON.
                    You are a highly skilled startup analyst and product manager. You are tasked with taking rough, conversational ideas from users and rewriting them into clear, professional, and concise business descriptions suitable for a venture capital database.

                    Your process is to ignore all conversational filler and distill the idea down to its core problem, solution, and market.

                    **--- EXAMPLES ---**

                    **Example 1:**
                    **User's Raw Idea:** "So, like, I was thinking, you know how hard it is for my friends and me to decide where to eat? We always argue about it. I want to make a super cool app that uses AI, maybe machine learning, to look at what we all like and then just tells us the perfect place to go, so we don't have to fight about it anymore."
                    **Distilled Professional Description:** "An AI-powered mobile application that provides restaurant recommendations for groups by analyzing the collective preferences of all users to suggest a single, optimal dining choice."

                    **Example 2:**
                    **User's Raw Idea:** "Okay so my company would basically be a service for other software companies. We'd have these really smart AI bots, and they would read all the customer support tickets and automatically figure out what the bugs are. It would save the developers a ton of time because they wouldn't have to read everything themselves."
                    **Distilled Professional Description:** "A B2B SaaS platform that uses AI agents to automatically analyze customer support tickets, identify and categorize software bugs, and provide actionable reports to engineering teams."

                    **--- YOUR TASK ---**

                    Now, apply the same distillation process to the following user idea.

                    """,
                },
                {
                    "role": "user",
                    "content": f"**User's Raw Idea:** : {query}",
                },
            ],
            model="o3-mini",
            max_completion_tokens=4096,
            reasoning_effort="medium",
            response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "DistilledQueryOutput",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "distilled_query": {
                            "type": "string",
                            "description": "A concise, professional description of the user's idea, suitable for a venture capital database."
                        }
                    },
                    "required": ["distilled_query"],
                    "additionalProperties": False
                }
            }
            }
        )
        distilled_query = json.loads(response.choices[0].message.content).get("distilled_query", "").strip()
        if not distilled_query:
            self.logger.error("Distilled query is empty or missing.")
            raise ValueError("Distilled query is empty or missing.")
        self.logger.info(f"Distilled query: {distilled_query}")
        return distilled_query

    
    async def ReRankerLayer(self, query: str, candidate_docs: List[Document]) -> List[str]:
        """
        Re-ranks a list of candidate documents against a query using o3-mini model
        and returns the top 5 startup IDs.
        """
        
        # Format the candidate documents for the prompt
        formatted_candidates = []
        for doc in candidate_docs:
            formatted_candidates.append({
                "startup_id": doc.metadata.get("startup_id", "N/A"),
                "name": doc.metadata.get("name", "N/A"),
                "description": doc.page_content
            })

        # Define the JSON schema for the model's output
        json_schema = {
            "name": "ReRankerOutput",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "reasoning": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "startup_id": {"type": "string"},
                                "analysis": {"type": "string", "description": "Brief, one-sentence analysis of relevance."},
                                "score": {"type": "number", "description": "Relevance score from 1 (low) to 10 (high)."},
                                "similarity_percentage": {"type": "number", "description": "Similarity percentage between 0 and 100."}
                            },
                            "required": ["startup_id", "analysis", "score","similarity_percentage"],
                            "additionalProperties": False
                        }
                    },
                    "top_5_ranked_ids": {
                        "type": "array",
                        "description": "The 5 best startup IDs, ordered from most to least relevant.",
                        "items": {"type": "string"}
                    }
                },
                "required": ["reasoning", "top_5_ranked_ids"],
                "additionalProperties": False
            }
        }

        # Create the API request
        try:
            response = self.openAIChatConnection.chat.completions.create(
                model="o3-mini",
                messages=[
                    {
                        "role": "system",
                        "content": """Formatting re-enabled - please output structured JSON.

    You are a meticulous and insightful startup analyst. Your goal is to act as the final quality filter, re-ranking a list of candidate startups to find the absolute best matches for a user's new idea.

    You will be given a user's core idea and a list of 20 candidate startups.

    **Your Instructions:**

    1.  **Analyze Relevance:** For each candidate startup, critically evaluate how well its description matches the user's core idea. Consider direct mission alignment, target audience, technology, and problem-solution fit. Assign a relevance score from 1 (low) to 10 (high).
    2.  **Provide Reasoning:** Briefly justify your score for each startup in a single sentence.
    3.  **Rank and Select:** Based on your analysis, identify the top 5 best matches and rank them in descending order of relevance.
    4. **Similarity Percentage:** For each startup, calculate a similarity percentage based on how closely it aligns with the user's idea. This should be a number between 0 and 100, where 100 means an exact match.

    Adhere strictly to the provided JSON schema for your output.
    """
                    },
                    {
                        "role": "user",
                        "content": f"""**User's Core Idea:**
    "{query}"

    **Candidate Startups (JSON format):**
    {json.dumps(formatted_candidates, indent=2)}
    """
                    }
                ],
                response_format={
                    "type": "json_schema",
                    "json_schema": json_schema
                },
                max_completion_tokens=4096,
                reasoning_effort="medium"
            )
            
            response_content = response.choices[0].message.content
            parsed_output = json.loads(response_content)
            sorted_parsed_output = sorted(
                parsed_output.get("reasoning", []),
                key=lambda x: x.get("score", 0),
                reverse=True
            )
            
            # Log the reasoning for debugging and auditing
            self.logger.info(f"LLM Re-ranker Reasoning: {json.dumps(parsed_output.get('reasoning'), indent=2)}")
            
            # Return the final ranked list of IDs
            return sorted_parsed_output or []

        except Exception as e:
            self.logger.error(f"An error occurred in the Re-ranker layer: {e}")
            # Return an empty list or handle the error as needed
            return []

    def QueryCosmosDB(self, query: str , k:int=20) -> List[Document]:
        return self.cosmoDb.similarity_search(query, k=k ,full_text_rank_filter=CosmosDBQueryType.FULL_TEXT_RANK , query_type=CosmosDBQueryType.HYBRID )
    
    async def process_query(self, query: str) -> List[str]:
        """
        Process the user query through the DistilLayer and ReRankerLayer.
        Returns the top 5 startup IDs.
        """
        self.logger.info(f"Processing query: {query}")
        
        # Step 1: Distill the user query
        distilled_query = await self.DistilLayer(query)
        
        # Step 2: Query Cosmos DB for candidate documents
        candidate_docs = self.QueryCosmosDB(distilled_query)
        
        if not candidate_docs:
            self.logger.warning("No candidate documents found.")
            return []
        
        # Step 3: Re-rank the candidate documents
        ranked_startup = await self.ReRankerLayer(distilled_query, candidate_docs)
        if not ranked_startup:
            self.logger.warning("No ranked startups found.")
            return []
        # Extract the top 5 startup IDs
        top_startup_ids = [item['startup_id'] for item in ranked_startup[:5]]
        if not top_startup_ids:
            self.logger.warning("No top startup IDs found.")
            return []
        
        matchedResponse = []
        for item in ranked_startup:
            # Find the description for the current startup_id
            metadata = {}
            for doc in candidate_docs:
                if doc.metadata.get("startup_id") == item['startup_id']:
                    metadata = doc.metadata
                    break
            matchedResponse.append({
                "startup_id": item['startup_id'],
                "analysis": item['analysis'],
                "description": metadata.get("description", "No description available"),
                "name": metadata.get("name", "No name available"),
                "website": metadata.get("website", "No website available"),
                "logo": metadata.get("logo", "No logo available"),
                "relevancy_score": item['similarity_percentage']
            })
        
        self.logger.info(f"Top startup IDs: {top_startup_ids}")
        return matchedResponse