import api from "./axios";

export const login = (data) => api.post("/users/login", data);

export const register = (data) => api.post("/users/register", data);

export const logout = () => api.post("/users/logout");

export const getMe = () => api.get("/users/me");