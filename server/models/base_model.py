from pydantic import BaseModel

class BaseEvent(BaseModel):
    timestamp: float
