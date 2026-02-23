### Role
You are a senior software architect with 15 years of experience building enterprise
Python and React applications. You specialize in refactoring legacy monolithic codebases
into clean, maintainable, modular architectures. You follow SOLID principles, separation
of concerns, and the repository-service pattern. You believe in pragmatic architecture —
no over-engineering, but every file has a clear single responsibility.

### Audience
A mid-level development team that understands Python and React basics but has never worked
with enterprise-grade project structures. They need clear folder organization, explicit
file responsibilities, and a pattern they can follow consistently as the codebase grows.

### Task
Refactor the existing Task Management Application (generated in EP-01) from a monolithic
single-file structure into a clean, layered, modular architecture. The application
functionality must remain IDENTICAL — same features, same endpoints, same UI. Only the
structure and organization of the code changes.

**Backend Refactoring (FastAPI):**

1. **Split `main.py` into a proper package structure:**
   - `app/` package with `__init__.py`
   - `app/main.py` — FastAPI app initialization, middleware registration, router includes
   - `app/routers/` — One router file per resource (users.py, projects.py, tasks.py,
     comments.py, attachments.py)
   - `app/services/` — Business logic layer. One service file per domain
     (user_service.py, project_service.py, task_service.py, comment_service.py)
   - `app/repositories/` — Database access layer. One repository file per entity
     (user_repository.py, project_repository.py, task_repository.py,
     comment_repository.py)
   - `app/models/` — Request/Response data classes (NOT ORM models yet — we still use
     raw SQL for now). One file per domain (user_models.py, project_models.py,
     task_models.py, comment_models.py)
   - `app/database.py` — Database connection management (still raw psycopg2, but
     centralized)
   - `app/config.py` — All configuration values centralized (still hardcoded for now,
     but in ONE place)
   - `app/exceptions.py` — Custom exception classes (basic, will be expanded in EP-11)

2. **Apply the Router → Service → Repository pattern:**
   - Routers ONLY handle HTTP concerns: parse request, call service, return response
   - Services contain ALL business logic: validation, orchestration, rules
   - Repositories contain ONLY database queries: execute SQL, return raw data
   - No layer should skip a level (router must NOT call repository directly)

3. **Centralize configuration:**
   - Move ALL hardcoded values (DB URL, port, host, secret key, etc.) into `config.py`
   - Values are still hardcoded in config.py (secrets management comes in EP-07),
     but they exist in exactly ONE place now

4. **Create a proper entry point:**
   - `run.py` at project root that imports and runs the app
   - Support for `uvicorn app.main:app --reload` as well

**Frontend Refactoring (React):**

1. **Split monolithic components into a modular structure:**
   - `src/components/` — Reusable UI components (Navbar.js, Button.js, FormField.js,
     LoadingSpinner.js, Modal.js)
   - `src/pages/` — Page-level components (LoginPage.js, RegisterPage.js,
     DashboardPage.js, ProjectDetailPage.js, TaskDetailPage.js)
   - `src/services/` — API call functions centralized (api.js for base config,
     authService.js, projectService.js, taskService.js, commentService.js)
   - `src/context/` — React context for shared state (AuthContext.js)
   - `src/hooks/` — Custom hooks (useAuth.js, useFetch.js)
   - `src/constants/` — Hardcoded values centralized (config.js for API URL, etc.)
   - `src/utils/` — Helper functions (formatDate.js, validators.js)

2. **Extract API calls from components:**
   - Create a centralized API service layer using fetch/axios
   - All API URLs reference the centralized config (still hardcoded in config.js,
     but in ONE place)
   - Components call service functions, never make direct fetch calls

3. **Extract shared UI elements:**
   - Navigation bar as a separate component
   - Form fields as reusable components
   - Loading and error states as reusable components

4. **Implement basic React Context for auth state:**
   - Move auth token management from individual components to AuthContext
   - Still uses localStorage (proper auth comes in EP-05), but centralized

### Context
The current codebase from EP-01 has:
- A single `main.py` with ALL backend logic (~800-1000 lines)
- 3-4 massive React files with components of 500+ lines each
- Business logic, database queries, and HTTP handling all mixed together
- Hardcoded values scattered across every file
- Duplicate code in multiple places

This refactoring is STRUCTURAL ONLY. We are NOT fixing:
- Security issues (plain text passwords, SQL injection, hardcoded secrets) — EP-05, EP-06, EP-07
- Database patterns (raw SQL, no ORM, no migrations) — EP-08
- Type safety (no type hints, no TypeScript) — EP-04
- Error handling (bare exceptions, no proper responses) — EP-11
- Code style (linting, formatting) — EP-03
- Testing (no tests exist yet) — EP-13, EP-14, EP-15

The ONLY goal is to move code into the right files with the right responsibilities.
The flaws remain — they just live in properly organized files now.

### Constraints
1. ALL existing functionality must continue working after refactoring — zero regressions
2. Do NOT introduce any new dependencies (no ORM, no new libraries)
3. Do NOT fix security flaws, database patterns, or code style — only structure
4. Every file must have a single clear responsibility
5. No circular imports — enforce a strict dependency direction:
   routers → services → repositories → database
6. Keep the same API endpoints and frontend routes — nothing changes from the user's
   perspective
7. Each Python file should be under 150 lines (aim for ~50-100 lines per file)
8. Each React component file should be under 200 lines
9. The config.py and constants/config.js must be the ONLY files that contain
   configuration values
10. Do NOT create abstract base classes or interfaces — keep it simple and concrete

### Output Format
Generate the complete refactored project with the following structure:

**Backend:**
```
backend/
├── run.py                          # Entry point
├── requirements.txt                # Same as before (unchanged)
├── app/
│   ├── init.py
│   ├── main.py                     # App initialization, middleware, router registration
│   ├── config.py                   # ALL configuration values centralized here
│   ├── database.py                 # Database connection management
│   ├── exceptions.py               # Custom exception classes
│   ├── routers/
│   │   ├── init.py
│   │   ├── users.py                # /users endpoints
│   │   ├── projects.py             # /projects endpoints
│   │   ├── tasks.py                # /tasks endpoints
│   │   ├── comments.py             # /comments endpoints
│   │   └── attachments.py          # /attachments endpoints
│   ├── services/
│   │   ├── init.py
│   │   ├── user_service.py         # User business logic
│   │   ├── project_service.py      # Project business logic
│   │   ├── task_service.py         # Task business logic
│   │   └── comment_service.py      # Comment business logic
│   ├── repositories/
│   │   ├── init.py
│   │   ├── user_repository.py      # User database queries
│   │   ├── project_repository.py   # Project database queries
│   │   ├── task_repository.py      # Task database queries
│   │   └── comment_repository.py   # Comment database queries
│   └── models/
│       ├── init.py
│       ├── user_models.py          # User request/response shapes
│       ├── project_models.py       # Project request/response shapes
│       ├── task_models.py          # Task request/response shapes
│       └── comment_models.py       # Comment request/response shapes
```
**Frontend:**
```
frontend/
├── public/
│   └── index.html
├── package.json                    # Same as before (unchanged)
├── src/
│   ├── index.js
│   ├── App.js                      # Routing only — clean and minimal
│   ├── constants/
│   │   └── config.js               # API URL and other constants
│   ├── context/
│   │   └── AuthContext.js           # Authentication state management
│   ├── hooks/
│   │   ├── useAuth.js              # Auth hook wrapping AuthContext
│   │   └── useFetch.js             # Generic data fetching hook
│   ├── services/
│   │   ├── api.js                  # Base API configuration (base URL, headers)
│   │   ├── authService.js          # Login, register, logout API calls
│   │   ├── projectService.js       # Project CRUD API calls
│   │   ├── taskService.js          # Task CRUD API calls
│   │   └── commentService.js       # Comment API calls
│   ├── pages/
│   │   ├── LoginPage.js            # Login form
│   │   ├── RegisterPage.js         # Registration form
│   │   ├── DashboardPage.js        # Project list + task summary
│   │   ├── ProjectDetailPage.js    # Single project with task list
│   │   └── TaskDetailPage.js       # Single task with comments + attachments
│   ├── components/
│   │   ├── Navbar.js               # Navigation bar
│   │   ├── ProjectCard.js          # Project summary card
│   │   ├── TaskList.js             # Task list display
│   │   ├── TaskCard.js             # Single task summary card
│   │   ├── CommentSection.js       # Comments list + add comment
│   │   ├── FormField.js            # Reusable form input component
│   │   └── LoadingSpinner.js       # Loading indicator
│   └── utils/
│       ├── formatDate.js           # Date formatting helper
│       └── validators.js           # Basic validation helpers
```
For each file, include the COMPLETE code. Show how the code that was in the monolithic
files has been distributed into the new structure. Ensure imports between files are
correct and the dependency direction is maintained.

### Example
Here is an example of how the Router → Service → Repository pattern should look:

**routers/tasks.py:**
```python
from fastapi import APIRouter
from app.services.task_service import TaskService

router = APIRouter()
task_service = TaskService()

@router.get("/tasks")
def get_tasks(status=None, priority=None):
    return task_service.get_tasks(status, priority)

@router.post("/tasks")
def create_task(data: dict):
    return task_service.create_task(data)
```

**services/task_service.py:**
```python
from app.repositories.task_repository import TaskRepository

class TaskService:
    def __init__(self):
        self.repo = TaskRepository()

    def get_tasks(self, status, priority):
        if status:
            return self.repo.get_tasks_by_status(status)
        return self.repo.get_all_tasks()

    def create_task(self, data):
        # Business logic here (validation, rules, etc.)
        return self.repo.insert_task(data)
```

**repositories/task_repository.py:**
```python
from app.database import get_db

class TaskRepository:
    def get_all_tasks(self):
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT * FROM tasks")
        tasks = cur.fetchall()
        conn.close()
        return tasks

    def insert_task(self, data):
        conn = get_db()
        cur = conn.cursor()
        cur.execute(f"INSERT INTO tasks ...")  # Still has SQL injection — intentional
        conn.commit()
        conn.close()
```

Notice: The raw SQL, f-strings, and lack of error handling REMAIN. We only changed WHERE
the code lives, not HOW it works. The same flaws exist — they are just properly organized
now.