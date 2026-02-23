import apiFetch from "./api";

export const projectService = {
  getAll: async () => {
    return apiFetch("/projectsAll");
  },
  getById: async (id) => {
    return apiFetch(`/ProjectById/${id}`);
  },
  create: async (projectData) => {
    return apiFetch("/project_create", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
  },
  update: async (id, name, description, owner) => {
    return apiFetch(
      `/UpdateProject/${id}?name=${encodeURIComponent(name)}&description=${encodeURIComponent(
        description
      )}&owner=${encodeURIComponent(owner)}`
    );
  },
  delete: async (id) => {
    return apiFetch(`/DeleteProject/${id}`);
  },
  getSummary: async () => {
    return apiFetch("/dashboardSummary");
  },
};
