import pyodbc
from app.config import DB_URL

def get_db_connection():
    """Create and return a new SQL Server database connection."""
    return pyodbc.connect(DB_URL)

def init_db():
    """Initialize required tables if they do not already exist.

    This function creates the `users`, `projects`, `tasks`, `comments`, and
    `attachments` tables using SQL Server-compatible `IF OBJECT_ID(...) IS NULL`
    checks, then commits the transaction and closes resources.
    """
    conn = get_db_connection()
    cur = conn.cursor()
    
    # SQL Server equivalent for "CREATE TABLE IF NOT EXISTS"
    cur.execute("""
        IF OBJECT_ID('users', 'U') IS NULL
        CREATE TABLE users (
            id INT IDENTITY(1,1) PRIMARY KEY,
            username NVARCHAR(MAX),
            password NVARCHAR(MAX),
            created_at NVARCHAR(MAX)
        );
    """)
    cur.execute("""
        IF OBJECT_ID('projects', 'U') IS NULL
        CREATE TABLE projects (
            id INT IDENTITY(1,1) PRIMARY KEY,
            name NVARCHAR(MAX),
            description NVARCHAR(MAX),
            [owner] NVARCHAR(MAX),
            created_at NVARCHAR(MAX)
        );
    """)
    cur.execute("""
        IF OBJECT_ID('tasks', 'U') IS NULL
        CREATE TABLE tasks (
            id INT IDENTITY(1,1) PRIMARY KEY,
            title NVARCHAR(MAX),
            description NVARCHAR(MAX),
            status NVARCHAR(MAX),
            priority NVARCHAR(MAX),
            assigned_to NVARCHAR(MAX),
            project_id INTEGER,
            created_at NVARCHAR(MAX)
        );
    """)
    cur.execute("""
        IF OBJECT_ID('comments', 'U') IS NULL
        CREATE TABLE comments (
            id INT IDENTITY(1,1) PRIMARY KEY,
            task_id INTEGER,
            username NVARCHAR(MAX),
            comment_text NVARCHAR(MAX),
            created_at NVARCHAR(MAX)
        );
    """)
    cur.execute("""
        IF OBJECT_ID('attachments', 'U') IS NULL
        CREATE TABLE attachments (
            id INT IDENTITY(1,1) PRIMARY KEY,
            task_id INTEGER,
            file_name NVARCHAR(MAX),
            file_path NVARCHAR(MAX),
            uploaded_at NVARCHAR(MAX)
        );
    """)
    
    conn.commit()
    cur.close()
    conn.close()
