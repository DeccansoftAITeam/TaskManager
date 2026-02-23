import apiFetch from "./api";

export const authService = {
  login: async (username, password) => {
    return apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },
  register: async (username, password, ownerName) => {
    return apiFetch("/registerUser", {
      method: "POST",
      body: JSON.stringify({ username, password, ownerName }),
    });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  },
};
