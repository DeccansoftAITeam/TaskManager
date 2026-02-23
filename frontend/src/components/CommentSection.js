import React, { useState, useEffect } from "react";
import { commentService } from "../services/commentService";
import { useAuth } from "../hooks/useAuth";

const CommentSection = ({ taskId }) => {
  const { username } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentUser, setCommentUser] = useState(username || "");

  const loadComments = async () => {
    const data = await commentService.getByTask(taskId);
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [taskId]);

  const handleAddComment = async () => {
    await commentService.add(taskId, commentUser, commentText);
    setCommentText("");
    loadComments();
  };

  return (
    <div style={{ border: "1px solid #aaa", padding: "10px", marginBottom: "16px" }}>
      <h3 style={{ marginTop: 0 }}>Comments</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <input
          style={{ padding: "8px", width: "160px" }}
          value={commentUser}
          placeholder="username"
          onChange={(e) => setCommentUser(e.target.value)}
        />
        <input
          style={{ padding: "8px", width: "420px" }}
          value={commentText}
          placeholder="comment"
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button style={{ padding: "8px" }} onClick={handleAddComment}>
          Add
        </button>
      </div>

      {comments.map((c) => (
        <div key={c.id} style={{ borderBottom: "1px solid #eee", padding: "6px" }}>
          <div style={{ fontWeight: "bold" }}>{c.username}</div>
          <div>{c.comment_text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{c.created_at}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
