from datetime import datetime
import time
import os
from app.repositories.task_repository import TaskRepository
from app.config import UPLOAD_DIR

class TaskService:
    def __init__(self):
        self.repo = TaskRepository()

    def get_all_tasks(self):
        rows = self.repo.get_all()
        arr = []
        for r in rows:
            arr.append({
                "id": r[0], "title": r[1], "description": r[2], "status": r[3],
                "priority": r[4], "assigned_to": r[5], "project_id": r[6], "created_at": r[7]
            })
        return arr

    def create_task(self, title, description, status, priority, assigned_to, project_id):
        created_at = str(datetime.now())
        task_id = self.repo.create(title, description, status, priority, assigned_to, project_id, created_at)
        return {"result": "created", "task_id": task_id}

    def get_task_detail(self, task_id):
        row = self.repo.get_by_id(task_id)
        if row:
            return {
                "id": row[0], "title": row[1], "description": row[2], "status": row[3],
                "priority": row[4], "assigned_to": row[5], "project_id": row[6], "created_at": row[7]
            }
        return {"message": "not found"}

    def update_task(self, task_id, title, description, status, priority, assigned_to, project_id):
        self.repo.update(task_id, title, description, status, priority, assigned_to, project_id)
        return {"message": "task updated", "id": task_id}

    def delete_task(self, task_id):
        self.repo.delete(task_id)
        return {"result": "deleted"}

    def filter_tasks(self, status, priority):
        rows = self.repo.filter(status, priority)
        arr = []
        for r in rows:
            arr.append({
                "id": r[0], "title": r[1], "description": r[2], "status": r[3],
                "priority": r[4], "assigned_to": r[5], "project_id": r[6], "created_at": r[7]
            })
        return {"result": arr}

    def upload_attachment(self, task_id, file):
        now_text = str(datetime.now())
        file_name = file.filename
        save_name = str(int(time.time())) + "_" + file_name
        full_path = os.path.join(UPLOAD_DIR, save_name)
        
        content = file.file.read()
        with open(full_path, "wb") as f:
            f.write(content)

        attachment_id = self.repo.create_attachment(task_id, file_name, full_path, now_text)
        return {
            "message": "uploaded",
            "attachment": {
                "id": attachment_id, "task_id": task_id,
                "file_name": file_name, "file_path": full_path
            }
        }

    def get_attachments(self, task_id):
        rows = self.repo.get_attachments_by_task(task_id)
        data = []
        for r in rows:
            data.append({
                "id": r[0], "task_id": r[1], "file_name": r[2],
                "file_path": r[3], "uploaded_at": r[4]
            })
        return {"attachments": data}

    def get_task_count(self):
        return self.repo.count()
