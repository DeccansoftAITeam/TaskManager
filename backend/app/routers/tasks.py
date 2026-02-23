from fastapi import APIRouter, Body
from app.services.task_service import TaskService

router = APIRouter()
task_service = TaskService()

@router.get("/task_list")
def task_list():
    return task_service.get_all_tasks()

@router.post("/task_create")
def task_create(data = Body(...)):
    title = data.get("title", "")
    description = data.get("description", "")
    status = data.get("status", "todo")
    priority = data.get("priority", "low")
    assigned_to = data.get("assigned_to", "")
    project_id = data.get("project_id", 0)
    return task_service.create_task(title, description, status, priority, assigned_to, project_id)

@router.get("/TaskDetail/{task_id}")
def task_detail(task_id: int):
    return task_service.get_task_detail(task_id)

@router.get("/task_update/{task_id}")
def task_update(task_id: int, title: str = "", description: str = "", status: str = "", priority: str = "", assigned_to: str = "", project_id: int = 0):
    return task_service.update_task(task_id, title, description, status, priority, assigned_to, project_id)

@router.get("/task_delete/{task_id}")
def task_delete(task_id: int):
    return task_service.delete_task(task_id)

@router.get("/tasks/filter")
def filter_tasks(status: str = "", priority: str = ""):
    return task_service.filter_tasks(status, priority)
