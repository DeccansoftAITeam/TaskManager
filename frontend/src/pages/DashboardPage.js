import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectService } from "../services/projectService";
import { taskService } from "../services/taskService";
import ProjectCard from "../components/ProjectCard";
import FormField from "../components/FormField";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [summary, setSummary] = useState({});
  const [allTasks, setAllTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [editingProjectId, setEditingProjectId] = useState("");

  const loadData = async () => {
    const projData = await projectService.getAll();
    setProjects(projData.data || []);
    
    const summData = await projectService.getSummary();
    setSummary(summData);

    const taskData = await taskService.getAll();
    setAllTasks(taskData);
  };

  useEffect(() => {
    loadData();
    const x = document.getElementById("lastRefreshTime");
    if (x) x.innerHTML = "Last Refresh: " + new Date().toString();
  }, []);

  const createOrUpdateProject = async () => {
    if (editingProjectId) {
      await projectService.update(editingProjectId, projectName, projectDescription, projectOwner);
      setEditingProjectId("");
    } else {
      await projectService.create({ name: projectName, description: projectDescription, owner: projectOwner });
    }
    setProjectName("");
    setProjectDescription("");
    setProjectOwner("");
    loadData();
  };

  const removeProject = async (id) => {
    await projectService.delete(id);
    loadData();
  };

  const runFilter = async () => {
    const data = await taskService.filter(statusFilter, priorityFilter);
    if (data.result) setAllTasks(data.result);
  };

  return (
    <div style={{ padding: "16px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ marginTop: 0 }}>Task Dashboard</h1>
        <Link
          to="/task/create"
          style={{
            padding: "10px 20px",
            background: "#222",
            color: "white",
            textDecoration: "none",
            border: "none",
          }}
        >
          + Add Task
        </Link>
      </div>
      <div id="lastRefreshTime" style={{ marginBottom: "10px", color: "#444" }}></div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        {[
          { label: "Projects", value: summary.projects },
          { label: "Tasks", value: summary.tasks },
          { label: "Users", value: summary.users },
          { label: "Comments", value: summary.comments },
        ].map((item) => (
          <div key={item.label} style={{ border: "1px solid #ccc", padding: "12px", width: "25%" }}>
            <div style={{ fontWeight: "bold" }}>{item.label}</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid #aaa", padding: "10px", marginBottom: "20px" }}>
        <h3 style={{ marginTop: 0 }}>{editingProjectId ? "Edit Project" : "Create Project"}</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ width: "220px" }}>
            <FormField placeholder="Project Name" value={projectName} onChange={setProjectName} />
          </div>
          <div style={{ width: "260px" }}>
            <FormField placeholder="Description" value={projectDescription} onChange={setProjectDescription} />
          </div>
          <div style={{ width: "180px" }}>
            <FormField placeholder="Owner" value={projectOwner} onChange={setProjectOwner} />
          </div>
          <button style={{ padding: "8px" }} onClick={createOrUpdateProject}>
            {editingProjectId ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
        <div style={{ width: "100%" }}>
          <h3 style={{ marginTop: 0 }}>Projects</h3>
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onEdit={(proj) => {
                setEditingProjectId(proj.id);
                setProjectName(proj.name || "");
                setProjectDescription(proj.description || "");
                setProjectOwner(proj.owner || "");
              }}
              onDelete={removeProject}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: "24px", border: "1px solid #aaa", padding: "10px" }}>
        <h3 style={{ marginTop: 0 }}>Filter Tasks</h3>
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
          <div style={{ width: "140px" }}>
            <FormField placeholder="status" value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div style={{ width: "140px" }}>
            <FormField placeholder="priority" value={priorityFilter} onChange={setPriorityFilter} />
          </div>
          <button style={{ padding: "8px" }} onClick={runFilter}>Filter</button>
          <button style={{ padding: "8px" }} onClick={() => loadData()}>Reset</button>
        </div>

        {allTasks.map((t) => (
          <div key={t.id} style={{ borderBottom: "1px solid #eee", padding: "6px" }}>
            <span style={{ fontWeight: "bold" }}>{t.title}</span>
            <span style={{ marginLeft: "8px" }}>{t.status}</span>
            <span style={{ marginLeft: "8px" }}>{t.priority}</span>
            <Link to={"/task/" + t.id} style={{ marginLeft: "8px", textDecoration: "none", border: "1px solid #333", padding: "4px", color: 'black' }}>
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
