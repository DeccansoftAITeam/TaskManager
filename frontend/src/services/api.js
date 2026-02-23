import { API_URL } from "../constants/config";

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    // Note: The legacy code didn't actually use the token in headers, 
    // but we can prepare for it. 
    // headers["Authorization"] = `Bearer ${token}`; 
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response.json();
};

export default apiFetch;
