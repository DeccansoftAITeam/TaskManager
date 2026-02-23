from app.database import get_db_connection

class CommentRepository:
    def create(self, task_id, username, comment_text, created_at):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "INSERT INTO comments (task_id, username, comment_text, created_at) OUTPUT INSERTED.id VALUES (?, ?, ?, ?)"
        cur.execute(sql, (task_id, username, comment_text, created_at))
        comment_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return comment_id

    def get_by_task(self, task_id):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "SELECT id, task_id, username, comment_text, created_at FROM comments WHERE task_id=? ORDER BY id DESC"
        cur.execute(sql, (task_id,))
        rows = cur.fetchall()
        conn.close()
        return rows

    def count(self):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM comments")
        count = cur.fetchone()[0]
        conn.close()
        return count
