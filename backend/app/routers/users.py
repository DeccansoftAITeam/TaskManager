from fastapi import APIRouter, Body
from app.services.user_service import UserService

router = APIRouter()
user_service = UserService()

@router.get("/getUsers")
def get_users():
    return user_service.get_users()

@router.post("/registerUser")
def register_user(data = Body(...)):
    username = data.get("username", "")
    password = data.get("password", "")
    return user_service.register_user(username, password)

@router.post("/login")
def login(data = Body(...)):
    username = data.get("username", "")
    password = data.get("password", "")
    return user_service.login(username, password)
