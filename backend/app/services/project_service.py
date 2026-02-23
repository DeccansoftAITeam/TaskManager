from datetime import datetime
from app.repositories.project_repository import ProjectRepository
from app.repositories.task_repository import TaskRepository

class ProjectService:
    def __init__(self):
        self.repo = ProjectRepository()
        self.task_repo = TaskRepository()

    def get_all_projects(self):
        rows = self.repo.get_all()
        arr = []
        for r in rows:
            arr.append({"id": r[0], "name": r[1], "description": r[2], "owner": r[3], "created_at": r[4]})
        return {"data": arr}

    def create_project(self, name, description, owner):
        created_at = str(datetime.now())
        new_id = self.repo.create(name, description, owner, created_at)
        return {"project_id": new_id, "name": name}

    def get_project_by_id(self, project_id):
        row = self.repo.get_by_id(project_id)
        task_rows = self.task_repo.get_by_project(project_id)
        
        tasks = []
        for t in task_rows:
            tasks.append({
                "id": t[0], "title": t[1], "description": t[2], "status": t[3],
                "priority": t[4], "assigned_to": t[5], "project_id": t[6], "created_at": t[7]
            })
            
        if row:
            return {
                "id": row[0], "name": row[1], "description": row[2],
                "owner": row[3], "created_at": row[4], "tasks": tasks
            }
        return {"message": "not found", "tasks": []}

    def update_project(self, project_id, name, description, owner):
        self.repo.update(project_id, name, description, owner)
        return {"result": "updated", "id": project_id}

    def delete_project(self, project_id):
        self.repo.delete(project_id)
        return {"message": "deleted", "id": project_id}

    def get_project_count(self):
        return self.repo.count()
