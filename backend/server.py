from fastapi import FastAPI, HTTPException
from fastapi.params import Query
from fastapi.responses import JSONResponse , Response
import logging
from models import ModelResponse , ErrorResponse , StartupResponse, IdeaRequest
from services import Services
import uvicorn
from db import requests_collection
from fastapi.middleware.cors import CORSMiddleware



logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Startup Idea Matcher API",
    description="An API that uses an AI pipeline to find the most relevant startup for a given idea.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <-- For dev, allows all. For prod, set your frontend URL(s) here.
    allow_credentials=True,
    allow_methods=["*"],  # Or ["POST", "OPTIONS"] if you want to restrict
    allow_headers=["*"],
)


matcher_service = Services(logger=logger)

@app.get("/health", tags=["Health Check"])
async def health_check():
    """
    Health check endpoint to verify if the service is running.
    """
    return {"status": "ok"}

@app.post("/match", response_model=ModelResponse, tags=["Startup Matching"])
async def match_ideas(request: IdeaRequest):
    """
    Only accept match if uuid exists in MongoDB and is pending.
    """
    # 1. Find uuid in MongoDB
    uuid = request.uuid
    if not uuid:
        logger.error("UUID is required for matching.")
        raise HTTPException(status_code=400, detail="UUID is required.")
    
    mongo_record = await requests_collection.find_one({"request_id": uuid})
    if not mongo_record:
        logger.error(f"UUID {uuid} not found.")
        raise HTTPException(status_code=404, detail="Invalid or expired request ID.")
    
    # 2. Only proceed if status == "pending"
    if mongo_record.get("status") in ["accepted", "rejected"]:
        logger.error(f"UUID {uuid} already processed ({mongo_record['status']}).")
        raise HTTPException(status_code=403, detail=f"Request already {mongo_record['status']}.")

    # 3. Continue with your business logic (your RAG, etc)
    matches = await matcher_service.process_query(request.raw_request)

    # 4. Update status to 'accepted' before returning result
    await requests_collection.update_one({"request_id": uuid}, {"$set": {"status": "accepted"}})

    return ModelResponse(status="success", matches=matches)

    
@app.options("/match")
async def match_options():
    return  Response(status_code=200)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)