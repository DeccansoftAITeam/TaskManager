from fastapi import APIRouter, Body
from app.services.project_service import ProjectService

router = APIRouter()
project_service = ProjectService()

@router.get("/projectsAll")
def get_all_projects():
    return project_service.get_all_projects()

@router.post("/project_create")
def project_create(data = Body(...)):
    name = data.get("name", "")
    description = data.get("description", "")
    owner = data.get("owner", "")
    return project_service.create_project(name, description, owner)

@router.get("/ProjectById/{project_id}")
def project_by_id(project_id: int):
    return project_service.get_project_by_id(project_id)

@router.get("/UpdateProject/{project_id}")
def update_project(project_id: int, name: str = "", description: str = "", owner: str = ""):
    return project_service.update_project(project_id, name, description, owner)

@router.get("/DeleteProject/{project_id}")
def delete_project(project_id: int):
    return project_service.delete_project(project_id)
