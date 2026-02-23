import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task, onEdit, onDelete }) => (
  <div style={{ border: "1px solid #eee", padding: "8px", marginBottom: "6px" }}>
    <div style={{ fontWeight: "bold" }}>{task.title}</div>
    <div style={{ fontSize: "12px" }}>{task.description}</div>
    <div style={{ fontSize: "12px" }}>
      {task.status} / {task.priority} / {task.assigned_to}
    </div>
    <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
      <Link style={{ padding: "6px", border: "1px solid #222", textDecoration: "none", color: 'black' }} to={"/task/" + task.id}>
        Open Task
      </Link>
      {onEdit && (
        <button style={{ padding: "6px" }} onClick={() => onEdit(task)}>
          Edit Task
        </button>
      )}
      {onDelete && (
        <button style={{ padding: "6px" }} onClick={() => onDelete(task.id)}>
          Delete Task
        </button>
      )}
    </div>
  </div>
);

export default TaskCard;
