import os
from dotenv import load_dotenv

class Config:
    def __init__(self):
        # Load environment variables from .env file
        load_dotenv()
        # Database configuration
        self.AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
        self.AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
        self.COSMOS_DB_ENDPOINT = os.getenv("COSMOS_DB_ENDPOINT")
        self.COSMOS_DB_KEY = os.getenv("COSMOS_DB_KEY")
        self.AZURE_OPENAI_EMBEDDINGS_ENDPOINT = os.getenv("AZURE_OPENAI_EMBEDDINGS_ENDPOINT")
        self.AZURE_OPENAI_EMBEDDINGS_API_KEY = os.getenv("AZURE_OPENAI_EMBEDDINGS_API_KEY")

config = Config()