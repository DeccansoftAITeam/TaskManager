import unittest
from pathlib import Path
import sys
from unittest.mock import Mock, patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.repositories.comment_repository import CommentRepository


class TestCommentRepositoryCreate(unittest.TestCase):
    def test_create_inserts_comment_returns_inserted_id_and_commits(self):
        mock_conn = Mock()
        mock_cursor = Mock()
        mock_conn.cursor.return_value = mock_cursor
        mock_cursor.fetchone.return_value = (101,)

        task_id = 5
        username = "alice"
        comment_text = "Looks good"
        created_at = "2026-02-20 10:30:00"

        expected_sql = "INSERT INTO comments (task_id, username, comment_text, created_at) OUTPUT INSERTED.id VALUES (?, ?, ?, ?)"
        expected_params = (task_id, username, comment_text, created_at)

        with patch("app.repositories.comment_repository.get_db_connection", return_value=mock_conn):
            repo = CommentRepository()
            result = repo.create(task_id, username, comment_text, created_at)

        self.assertEqual(result, 101)
        mock_conn.cursor.assert_called_once_with()
        mock_cursor.execute.assert_called_once_with(expected_sql, expected_params)
        mock_cursor.fetchone.assert_called_once_with()
        mock_conn.commit.assert_called_once_with()
        mock_conn.close.assert_called_once_with()

    def test_get_by_task_fetches_comments_and_returns_rows(self):
        mock_conn = Mock()
        mock_cursor = Mock()
        mock_conn.cursor.return_value = mock_cursor
        mock_data = [(1, 5, "alice", "Comment 1", "2026-02-20")]
        mock_cursor.fetchall.return_value = mock_data

        task_id = 5
        expected_sql = "SELECT id, task_id, username, comment_text, created_at FROM comments WHERE task_id=? ORDER BY id DESC"
        expected_params = (task_id,)

        with patch("app.repositories.comment_repository.get_db_connection", return_value=mock_conn):
            repo = CommentRepository()
            result = repo.get_by_task(task_id)

        self.assertEqual(result, mock_data)
        mock_cursor.execute.assert_called_once_with(expected_sql, expected_params)
        mock_conn.close.assert_called_once_with()


if __name__ == "__main__":
    unittest.main()
