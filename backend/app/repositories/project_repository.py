from app.database import get_db_connection

class ProjectRepository:
    def get_all(self):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, name, description, [owner], created_at FROM projects ORDER BY id DESC")
        rows = cur.fetchall()
        conn.close()
        return rows

    def create(self, name, description, owner, created_at):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "INSERT INTO projects (name, description, [owner], created_at) OUTPUT INSERTED.id VALUES (?, ?, ?, ?)"
        cur.execute(sql, (name, description, owner, created_at))
        new_id = int(cur.fetchone()[0])
        conn.commit()
        conn.close()
        return new_id

    def get_by_id(self, project_id):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "SELECT id, name, description, [owner], created_at FROM projects WHERE id=?"
        cur.execute(sql, (project_id,))
        row = cur.fetchone()
        conn.close()
        return row

    def update(self, project_id, name, description, owner):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "UPDATE projects SET name=?, description=?, [owner]=? WHERE id=?"
        cur.execute(sql, (name, description, owner, project_id))
        conn.commit()
        conn.close()

    def delete(self, project_id):
        conn = get_db_connection()
        cur = conn.cursor()
        sql = "DELETE FROM projects WHERE id=?"
        cur.execute(sql, (project_id,))
        conn.commit()
        conn.close()

    def count(self):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM projects")
        count = cur.fetchone()[0]
        conn.close()
        return count
