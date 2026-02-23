from pydantic import BaseModel

class CommentCreate(BaseModel):
    task_id: int
    username: str
    comment_text: str

class CommentResponse(BaseModel):
    id: int
    task_id: int
    username: str
    comment_text: str
    created_at: str
