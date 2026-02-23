from pydantic import BaseModel
from typing import List, Optional

class ProjectCreate(BaseModel):
    name: str
    description: str
    owner: str

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    owner: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: str
    owner: str
    created_at: str
    tasks: Optional[List] = []
