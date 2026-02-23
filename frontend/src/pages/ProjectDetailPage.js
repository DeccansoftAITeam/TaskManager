import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projectService } from "../services/projectService";
import { taskService } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import FormField from "../components/FormField";

function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("todo");
  const [taskPriority, setTaskPriority] = useState("low");
  const [assignedTo, setAssignedTo] = useState("");
  const [editingTaskId, setEditingTaskId] = useState("");

  const loadProject = async () => {
    const data = await projectService.getById(id);
    setProject(data);
    setTasks(data.tasks || []);
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const handleCreateOrUpdateTask = async () => {
    const taskData = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      priority: taskPriority,
      assigned_to: assignedTo,
      project_id: id,
    };

    if (editingTaskId) {
      await taskService.update(editingTaskId, taskData);
      setEditingTaskId("");
    } else {
      await taskService.create(taskData);
    }

    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("todo");
    setTaskPriority("low");
    setAssignedTo("");
    loadProject();
  };

  const removeTask = async (taskId) => {
    await taskService.delete(taskId);
    loadProject();
  };

  return (
    <div style={{ padding: "16px", fontFamily: "Arial" }}>
      <Link to="/dashboard" style={{ textDecoration: 'none', border: '1px solid #333', padding: '6px', color: 'black' }}>Back to Dashboard</Link>
      
      <h3>Project Detail</h3>
      {project ? (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <div>ID: {project.id}</div>
          <div>Name: {project.name}</div>
          <div>Description: {project.description}</div>
          <div>Owner: {project.owner}</div>
        </div>
      ) : (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>Loading project...</div>
      )}

      <div style={{ border: "1px solid #aaa", padding: "10px", marginBottom: "20px" }}>
        <h3 style={{ marginTop: 0 }}>{editingTaskId ? "Edit Task" : "Create Task"}</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ width: "220px" }}><FormField placeholder="Title" value={taskTitle} onChange={setTaskTitle} /></div>
          <div style={{ width: "260px" }}><FormField placeholder="Description" value={taskDescription} onChange={setTaskDescription} /></div>
          <div style={{ width: "120px" }}><FormField placeholder="Status" value={taskStatus} onChange={setTaskStatus} /></div>
          <div style={{ width: "120px" }}><FormField placeholder="Priority" value={taskPriority} onChange={setTaskPriority} /></div>
          <div style={{ width: "120px" }}><FormField placeholder="Assigned" value={assignedTo} onChange={setAssignedTo} /></div>
          <button style={{ padding: "8px" }} onClick={handleCreateOrUpdateTask}>
            {editingTaskId ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <h4>Tasks in this project</h4>
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onEdit={(task) => {
            setEditingTaskId(task.id);
            setTaskTitle(task.title || "");
            setTaskDescription(task.description || "");
            setTaskStatus(task.status || "");
            setTaskPriority(task.priority || "");
            setAssignedTo(task.assigned_to || "");
          }}
          onDelete={removeTask}
        />
      ))}
    </div>
  );
}

export default ProjectDetailPage;
