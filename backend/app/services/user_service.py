from datetime import datetime
import time
from app.repositories.user_repository import UserRepository

class UserService:
    def __init__(self):
        self.repo = UserRepository()

    def get_users(self):
        rows = self.repo.get_all()
        data = []
        for r in rows:
            data.append({"id": r[0], "username": r[1], "password": r[2], "created_at": r[3]})
        return data

    def register_user(self, username, password):
        created_at = str(datetime.now())
        user_id = self.repo.create(username, password, created_at)
        return {"result": "ok", "userId": user_id, "username": username}

    def login(self, username, password):
        user = self.repo.get_by_credentials(username, password)
        if user:
            token = "fake-token-" + username + "-" + str(int(time.time()))
            return {"token": token, "message": "success", "user": {"id": user[0], "username": user[1]}}
        return {"message": "fail", "token": ""}

    def get_user_count(self):
        return self.repo.count()
