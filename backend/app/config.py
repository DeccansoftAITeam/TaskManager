import os

SECRET_KEY = "mysecret123"
DB_URL = "DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost\\SQLEXPRESS;DATABASE=taskmanager;Trusted_Connection=yes;"
UPLOAD_DIR = "uploads"
HOST = "0.0.0.0"
PORT = 8000
MAGIC_NUMBER = 42
CORS_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]

# Ensure upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
