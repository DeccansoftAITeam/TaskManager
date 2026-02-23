import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { taskService } from "../services/taskService";
import { projectService } from "../services/projectService";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";

const STATUS_OPTIONS = ["todo", "in_progress", "done"];
const PRIORITY_OPTIONS = ["low", "medium", "high"];

function CreateTaskPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("low");
  const [assignedTo, setAssignedTo] = useState("");
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectService.getAll();
        const projectList = data.data || [];
        setProjects(projectList);
        if (projectList.length > 0) {
          setProjectId(String(projectList[0].id));
        }
      } catch {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const validateForm = () => {
    if (!title.trim()) return "Title is required.";
    if (!description.trim()) return "Description is required.";
    if (!assignedTo.trim()) return "Assigned To is required.";
    if (!projectId) return "Please select a project.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        assigned_to: assignedTo.trim(),
        project_id: Number(projectId),
      };
      await taskService.create(taskData);
      navigate("/dashboard");
    } catch {
      setError("Failed to create task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ padding: "16px", fontFamily: "Arial", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>Create New Task</h1>

      {error && (
        <div
          role="alert"
          style={{
            background: "#fdd",
            border: "1px solid #c00",
            color: "#900",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="task-title" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Title <span style={{ color: "red" }}>*</span>
          </label>
          <FormField
            placeholder="Enter task title"
            value={title}
            onChange={setTitle}
            style={{ boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="task-description" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Description <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ padding: "8px", width: "100%", boxSizing: "border-box", fontFamily: "Arial" }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="task-status" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
              Status
            </label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="task-priority" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
              Priority
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
            >
              {PRIORITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="task-assigned" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Assigned To <span style={{ color: "red" }}>*</span>
          </label>
          <FormField
            placeholder="Enter assignee name"
            value={assignedTo}
            onChange={setAssignedTo}
            style={{ boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="task-project" style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}>
            Project <span style={{ color: "red" }}>*</span>
          </label>
          {projects.length > 0 ? (
            <select
              id="task-project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
            >
              {projects.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.name}
                </option>
              ))}
            </select>
          ) : (
            <div style={{ color: "#999" }}>No projects available. Create a project first.</div>
          )}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="submit"
            disabled={submitting || projects.length === 0}
            style={{
              padding: "10px 20px",
              background: "#222",
              color: "white",
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? "Creating..." : "Create Task"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "10px 20px",
              background: "white",
              color: "#222",
              border: "1px solid #222",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskPage;
