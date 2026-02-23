from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.users import router as users_router
from app.routers.projects import router as projects_router
from app.routers.tasks import router as tasks_router
from app.routers.comments import router as comments_router
from app.routers.attachments import router as attachments_router
from app.database import init_db
from app.config import SECRET_KEY, CORS_ORIGINS
from app.services.user_service import UserService
from app.services.project_service import ProjectService
from app.services.task_service import TaskService
from app.services.comment_service import CommentService

app = FastAPI()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database
@app.on_event("startup")
def startup_event():
    init_db()

# Include Routers
app.include_router(users_router)
app.include_router(projects_router)
app.include_router(tasks_router)
app.include_router(comments_router)
app.include_router(attachments_router)

@app.get("/")
def home_page():
    return {"message": "task manager api running", "secret": SECRET_KEY}

@app.get("/dashboardSummary")
def dashboard_summary():
    user_service = UserService()
    project_service = ProjectService()
    task_service = TaskService()
    comment_service = CommentService()
    
    return {
        "projects": project_service.get_project_count(),
        "tasks": task_service.get_task_count(),
        "users": user_service.get_user_count(),
        "comments": comment_service.get_comment_count(),
        "magic": 123
    }
