from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import logging
from models import ModelResponse , ErrorResponse , StartupResponse, IdeaRequest
from services import Services
import uvicorn


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Startup Idea Matcher API",
    description="An API that uses an AI pipeline to find the most relevant startup for a given idea.",
    version="1.0.0"
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
    Match a startup idea with existing startups based on the provided raw request.
    
    Parameters:
    - request: IdeaRequest containing the raw request string and optional user ID.
    
    Returns:
    - ModelResponse containing the matched startups or an error message.
    """
    try:
        matches = await matcher_service.process_query(request.raw_request)
        return ModelResponse(status="success", matches=matches)
    except Exception as e:
        logger.error(f"Error matching ideas: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)