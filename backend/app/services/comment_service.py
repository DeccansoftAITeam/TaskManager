from datetime import datetime
from app.repositories.comment_repository import CommentRepository

class CommentService:
    def __init__(self):
        self.repo = CommentRepository()

    def add_comment(self, task_id, username, comment_text):
        created_at = str(datetime.now())
        comment_id = self.repo.create(task_id, username, comment_text, created_at)
        return {"data": {"id": comment_id, "task_id": task_id, "comment": comment_text}}

    def get_comments(self, task_id):
        rows = self.repo.get_by_task(task_id)
        arr = []
        for r in rows:
            arr.append({
                "id": r[0], "task_id": r[1], "username": r[2],
                "comment_text": r[3], "created_at": r[4],
            })
        return arr

    def get_comment_count(self):
        return self.repo.count()
