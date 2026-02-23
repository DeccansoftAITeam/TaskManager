import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onEdit, onDelete }) => (
  <div key={project.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "8px" }}>
    <div style={{ fontWeight: "bold" }}>{project.name}</div>
    <div style={{ fontSize: "12px" }}>{project.description}</div>
    <div style={{ fontSize: "12px" }}>Owner: {project.owner}</div>
    <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
      <Link style={{ padding: "6px", border: "1px solid #222", textDecoration: "none", color: 'black' }} to={"/project/" + project.id}>
        Open
      </Link>
      <button style={{ padding: "6px" }} onClick={() => onEdit(project)}>
        Edit
      </button>
      <button style={{ padding: "6px" }} onClick={() => onDelete(project.id)}>
        Delete
      </button>
    </div>
  </div>
);

export default ProjectCard;
