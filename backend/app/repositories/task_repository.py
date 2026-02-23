from app.database import get_db_connection

class TaskRepository:
    def get_all(self):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, title, description, status, priority, assigned_to, project_id, created_at FROM tasks ORDER BY id DESC")
        rows = cur.fetchall()
        conn.close()
        return rows

    def get_by_project(self, project_id):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "SELECT id, title, description, status, priority, assigned_to, project_id, created_at FROM tasks WHERE project_id=? ORDER BY id DESC"
        cur.execute(sql, (project_id,))
        rows = cur.fetchall()
        conn.close()
        return rows

    def create(self, title, description, status, priority, assigned_to, project_id, created_at):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "INSERT INTO tasks (title, description, status, priority, assigned_to, project_id, created_at) OUTPUT INSERTED.id VALUES (?, ?, ?, ?, ?, ?, ?)"
        cur.execute(sql, (title, description, status, priority, assigned_to, project_id, created_at))
        task_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return task_id

    def get_by_id(self, task_id):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "SELECT id, title, description, status, priority, assigned_to, project_id, created_at FROM tasks WHERE id=?"
        cur.execute(sql, (task_id,))
        row = cur.fetchone()
        conn.close()
        return row

    def update(self, task_id, title, description, status, priority, assigned_to, project_id):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "UPDATE tasks SET title=?, description=?, status=?, priority=?, assigned_to=?, project_id=? WHERE id=?"
        cur.execute(sql, (title, description, status, priority, assigned_to, project_id, task_id))
        conn.commit()
        conn.close()

    def delete(self, task_id):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "DELETE FROM tasks WHERE id=?"
        cur.execute(sql, (task_id,))
        conn.commit()
        conn.close()

    def filter(self, status, priority):
        conn = get_db_connection()
        cur = conn.cursor()
        q = "SELECT id, title, description, status, priority, assigned_to, project_id, created_at FROM tasks WHERE 1=1"
        params = []
        if status:
            q += " AND status=?"
            params.append(status)
        if priority:
            q += " AND priority=?"
            params.append(priority)
        q += " ORDER BY id DESC"
        cur.execute(q, tuple(params))
        rows = cur.fetchall()
        conn.close()
        return rows

    def count(self):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM tasks")
        count = cur.fetchone()[0]
        conn.close()
        return count

    # Attachment logic moved here as per output structure guidance (or I can keep it in a separate repo)
    # The prompt structure lists attachments as a router but doesn't explicitly name an attachment_repository.
    # I'll create attachment_repository.py to follow SRP better, even if not explicitly mandated.
    # WAIT, the prompt says: "One repository file per entity (user_repository.py, project_repository.py, task_repository.py, comment_repository.py)".
    # It doesn't list attachment_repository.py. I'll put attachment logic in task_repository.py.

    def create_attachment(self, task_id, file_name, file_path, uploaded_at):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "INSERT INTO attachments (task_id, file_name, file_path, uploaded_at) OUTPUT INSERTED.id VALUES (?, ?, ?, ?)"
        cur.execute(sql, (task_id, file_name, file_path, uploaded_at))
        attachment_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return attachment_id

    def get_attachments_by_task(self, task_id):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "SELECT id, task_id, file_name, file_path, uploaded_at FROM attachments WHERE task_id=? ORDER BY id DESC"
        cur.execute(sql, (task_id,))
        rows = cur.fetchall()
        conn.close()
        return rows
