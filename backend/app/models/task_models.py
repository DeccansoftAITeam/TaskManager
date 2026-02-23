from pydantic import BaseModel
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    description: str
    status: str = "todo"
    priority: str = "low"
    assigned_to: str
    project_id: int

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    assigned_to: Optional[str] = None
    project_id: Optional[int] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    priority: str
    assigned_to: str
    project_id: int
    created_at: str
