import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { taskService } from "../services/taskService";
import FormField from "../components/FormField";
import CommentSection from "../components/CommentSection";

function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [projectId, setProjectId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const loadTask = async () => {
    const data = await taskService.getById(id);
    setTask(data);
    setTitle(data.title || "");
    setDescription(data.description || "");
    setStatus(data.status || "");
    setPriority(data.priority || "");
    setAssignedTo(data.assigned_to || "");
    setProjectId(data.project_id || "");

    const attachData = await taskService.getAttachments(id);
    setAttachments(attachData.attachments || []);
  };

  useEffect(() => {
    loadTask();
  }, [id]);

  const saveTask = async () => {
    await taskService.update(id, { title, description, status, priority, assigned_to: assignedTo, project_id: projectId });
    loadTask();
  };

  const uploadFile = async () => {
    if (!selectedFile) return;
    await taskService.uploadAttachment(id, selectedFile);
    loadTask();
  };

  return (
    <div style={{ padding: "16px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "10px" }}>
        <Link to="/dashboard" style={{ border: "1px solid #333", padding: "6px", textDecoration: "none", color: 'black' }}>
          Back to Dashboard
        </Link>
      </div>

      <h1 style={{ marginTop: 0 }}>Task Detail #{id}</h1>

      {task ? (
        <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ width: "200px" }}><FormField placeholder="title" value={title} onChange={setTitle} /></div>
            <div style={{ width: "240px" }}><FormField placeholder="description" value={description} onChange={setDescription} /></div>
            <div style={{ width: "110px" }}><FormField placeholder="status" value={status} onChange={setStatus} /></div>
            <div style={{ width: "110px" }}><FormField placeholder="priority" value={priority} onChange={setPriority} /></div>
            <div style={{ width: "130px" }}><FormField placeholder="assigned" value={assignedTo} onChange={setAssignedTo} /></div>
            <div style={{ width: "100px" }}><FormField placeholder="project id" value={projectId} onChange={setProjectId} /></div>
            <button style={{ padding: "8px" }} onClick={saveTask}>Save Task</button>
          </div>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "16px" }}>Task not found</div>
      )}

      <CommentSection taskId={id} />

      <div style={{ border: "1px solid #aaa", padding: "10px", marginBottom: "16px" }}>
        <h3 style={{ marginTop: 0 }}>Attachments</h3>
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
          <input type="file" style={{ padding: "8px" }} onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button style={{ padding: "8px" }} onClick={uploadFile}>Upload</button>
        </div>

        {attachments.map((a) => (
          <div key={a.id} style={{ borderBottom: "1px solid #eee", padding: "6px" }}>
            <div>{a.file_name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{a.file_path}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskDetailPage;
