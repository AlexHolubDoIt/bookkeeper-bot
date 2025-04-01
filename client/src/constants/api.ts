export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
  BOTS: `${API_BASE_URL}/bots`,
  TASKS: `${API_BASE_URL}/tasks`,
  AVAILABLE_TASKS: `${API_BASE_URL}/tasks/available`,
  HEALTH: `${API_BASE_URL}/health`,
};

export const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
