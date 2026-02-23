from fastapi import APIRouter, File, UploadFile
from app.services.task_service import TaskService

router = APIRouter()
task_service = TaskService()

@router.post("/uploadAttachment/{task_id}")
def upload_attachment(task_id: int, file: UploadFile = File(...)):
    return task_service.upload_attachment(task_id, file)

@router.get("/attachments/{task_id}")
def get_attachments(task_id: int):
    return task_service.get_attachments(task_id)
