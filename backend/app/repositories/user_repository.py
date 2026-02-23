from app.database import get_db_connection

class UserRepository:
    def get_all(self):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, username, password, created_at FROM users ORDER BY id DESC")
        rows = cur.fetchall()
        conn.close()
        return rows

    def create(self, username, password, created_at):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "INSERT INTO users (username, password, created_at) OUTPUT INSERTED.id VALUES (?, ?, ?)"
        cur.execute(sql, (username, password, created_at))
        user_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return user_id

    def get_by_credentials(self, username, password):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "SELECT id, username FROM users WHERE username=? AND password=?"
        cur.execute(sql, (username, password))
        user = cur.fetchone()
        conn.close()
        return user

    def count(self):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM users")
        count = cur.fetchone()[0]
        conn.close()
        return count
