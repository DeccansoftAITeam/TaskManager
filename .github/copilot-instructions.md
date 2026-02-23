# GitHub Copilot Instructions

> These instructions apply to **every prompt** in this project. They define non-negotiable standards for code quality, structure, and conventions across the full stack (FastAPI backend + React frontend).

---

## 🏗️ Project Architecture

- **Backend**: FastAPI (Python 3.11+) following layered architecture — Routes → Services → Repositories → Models
- **Frontend**: React (TypeScript) using functional components, hooks, and Context API
- **Database**: PostgreSQL via SQLAlchemy ORM with Alembic migrations
- **Package Manager**: Use **Bun** (not npm) for all frontend dependency management
- **Containerization**: Docker + docker-compose for all services

### Directory Structure
```
project-root/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask/FastAPI app factory
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── routes/              # API endpoint handlers
│   │   ├── services/            # Business logic layer
│   │   ├── repositories/        # Data access layer (Repository pattern)
│   │   ├── schemas/             # Pydantic request/response models
│   │   ├── core/                # exceptions.py, logging_config.py, security.py
│   │   ├── utils/               # Reusable helper functions
│   │   └── config/              # settings.py per environment
│   ├── tests/
│   ├── migrations/              # Alembic migration files
│   ├── requirements.txt
│   ├── .env.example
│   └── pytest.ini
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Route-level page components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── context/             # Context API providers
│   │   ├── services/            # Centralized API service layer
│   │   ├── utils/               # Utility/helper functions
│   │   └── types/               # TypeScript interfaces/types
│   ├── __tests__/
│   └── package.json
├── .github/
│   ├── workflows/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
└── docker-compose.yml
```

---

## 🐍 Python / Backend Standards

### Naming & Style
- **snake_case** for all variables, functions, and file names
- **PascalCase** for classes
- **UPPER_SNAKE_CASE** for constants
- No `print()` statements — use the configured logger
- All functions **must have type hints**
- Max file length: **600 lines**

### Code Quality Tools (always configured)
- `black` — code formatting
- `isort` — import sorting
- `flake8` — linting
- `pre-commit` — enforces all checks before commit

### Docstrings
Use **Google-style** docstrings on every function and class:
```python
def get_task(task_id: int) -> TaskResponse:
    """Retrieve a single task by ID.

    Args:
        task_id: The unique identifier of the task.

    Returns:
        TaskResponse: The task data transfer object.

    Raises:
        TaskNotFoundError: If no task exists with the given ID.
    """
```

### Error Handling
- Use custom exception classes from `app/core/exceptions.py`
- Wrap all DB operations in try/except
- Never expose stack traces to clients
- Return structured, user-friendly error responses

### Security
- Use Pydantic schemas for ALL request validation
- Parameterized queries only — no raw SQL string interpolation
- Hash passwords with `passlib[bcrypt]`
- Store secrets in environment variables — never hardcode
- Enforce CORS to specific origins
- Add rate limiting via `slowapi`

---

## ⚛️ React / Frontend Standards

### Naming & Style
- **camelCase** for variables, functions, props
- **PascalCase** for components and TypeScript types/interfaces
- No `console.log` in production code — use dev-only guards
- **No `var`** — use `const` by default, `let` only when reassignment needed
- Max file length: **600 lines**

### Component Conventions
- Functional components only — no class components
- Props must be typed with TypeScript interfaces
- Use **custom hooks** to extract reusable logic
- Use **Context API** for global state (auth, theme, notifications)
- Apply Container/Presenter (smart/dumb) separation

### Accessibility (WCAG 2.1/2.2)
- All interactive elements must be keyboard accessible
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Provide `aria-label` / `aria-describedby` where needed
- Ensure sufficient color contrast (4.5:1 minimum)
- All images need descriptive `alt` text

### API Calls
- Centralized API service in `src/services/api.ts`
- Use `axios` with request/response interceptors
- Handle loading, error, and empty states in every async call
- Add request cancellation on component unmount

### Code Quality Tools
- `ESLint` with React + hooks rules
- `Prettier` for formatting
- Bun for all package management (`bun install`, `bun run`, `bun test`)

---

## 🔐 Authentication & Authorization
- JWT-based auth with access + refresh tokens
- Tokens stored in secure `httpOnly` cookies — NOT localStorage
- Protected routes on both frontend and backend
- Role-Based Access Control (RBAC) enforced at service layer

---

## 🗄️ Database Standards
- **SQLAlchemy ORM** only — no raw SQL
- All schema changes via **Alembic migrations**
- Every model includes: `id`, `created_at`, `updated_at`, `is_deleted` (soft delete)
- Add DB indexes on frequently queried fields
- Use transactions for multi-step operations

---

## 🌐 API Design Standards
- Base path: `/api/v1/`
- Resource names: **plural nouns** (`/api/v1/tasks`, `/api/v1/users`)
- Correct HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Correct status codes: `200`, `201`, `204`, `400`, `401`, `404`, `500`
- Consistent response envelope:
  ```json
  { "data": {}, "message": "Success", "status": 200 }
  ```
- Paginated list responses include `total`, `limit`, `offset`
- OpenAPI/Swagger docs auto-enabled via FastAPI

---

## ✅ Testing Requirements
- **Backend**: pytest, minimum **80% coverage**, tests in `backend/tests/`
- **Frontend**: Jest + React Testing Library, tests in `src/__tests__/`
- Test CRUD operations, edge cases, and error scenarios
- CI pipeline fails if coverage drops below 80%

---

## 🔧 Environment & Configuration
- Use `.env.development`, `.env.staging`, `.env.production`
- Validate all required env vars at application startup
- Never commit `.env` files — only `.env.example`
- Configuration loaded via `app/config/settings.py` (Pydantic BaseSettings)

---

## 📋 General Rules (Apply Always)
1. **No giant files** — split any file exceeding 600 lines
2. **DRY** — extract repeated logic into utilities or base classes
3. **Single Responsibility** — each function/class does one thing
4. **No hardcoded secrets**, URLs, or magic numbers
5. **Use dependency injection** for DB sessions and services
6. **Document complex logic** with inline comments; skip obvious code
7. **Pre-commit hooks** must pass before any commit
