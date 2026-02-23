import apiFetch from "./api";
import { API_URL } from "../constants/config";

export const taskService = {
  getAll: async () => {
    return apiFetch("/task_list");
  },
  getById: async (id) => {
    return apiFetch(`/TaskDetail/${id}`);
  },
  create: async (taskData) => {
    return apiFetch("/task_create", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  },
  update: async (id, taskData) => {
    const { title, description, status, priority, assigned_to, project_id } = taskData;
    return apiFetch(
      `/task_update/${id}?title=${encodeURIComponent(title)}&description=${encodeURIComponent(
        description
      )}&status=${encodeURIComponent(status)}&priority=${encodeURIComponent(
        priority
      )}&assigned_to=${encodeURIComponent(assigned_to)}&project_id=${encodeURIComponent(
        project_id
      )}`
    );
  },
  delete: async (id) => {
    return apiFetch(`/task_delete/${id}`);
  },
  filter: async (status, priority) => {
    return apiFetch(`/tasks/filter?status=${encodeURIComponent(status)}&priority=${encodeURIComponent(priority)}`);
  },
  uploadAttachment: async (taskId, file) => {
    var form = new FormData();
    form.append("file", file);
    const response = await fetch(`${API_URL}/uploadAttachment/${taskId}`, {
      method: "POST",
      body: form,
    });
    return response.json();
  },
  getAttachments: async (taskId) => {
    return apiFetch(`/attachments/${taskId}`);
  },
};
