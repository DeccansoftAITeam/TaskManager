from fastapi import APIRouter, Body
from app.services.comment_service import CommentService

router = APIRouter()
comment_service = CommentService()

@router.post("/task/comment/add")
def add_task_comment(data = Body(...)):
    task_id = data.get("task_id", 0)
    username = data.get("username", "")
    comment_text = data.get("comment_text", "")
    return comment_service.add_comment(task_id, username, comment_text)

@router.get("/task/comments/{task_id}")
def task_comments(task_id: int):
    return comment_service.get_comments(task_id)
