from pydantic import BaseModel , Field
from typing import List , Optional , Dict , Any

class IdeaRequest(BaseModel):
    raw_request:str = Field(..., description="The raw request string containing the idea details.")
    uuid: Optional[str] = Field(None, description="The ID of the user making the request.")

class StartupResponse(BaseModel):
    startup_id: str
    name: str
    description: str
    analysis: str
    website: Optional[str] = None
    logo: Optional[str] = None
    relevancy_score: Optional[float] = None

class ModelResponse(BaseModel):
    status: str = Field(..., description="The status of the startup response, e.g., 'success' or 'error'.")
    matches: List[StartupResponse] 

class ErrorResponse(BaseModel):
    detail: str
