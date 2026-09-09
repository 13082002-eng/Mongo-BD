import api from "./axios";

export const login = (data) => {
  return api.post("/users/login", data);
};

export const register = (data) => {
  return api.post("/users/register", data);
};