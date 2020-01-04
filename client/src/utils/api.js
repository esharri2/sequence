import axios from "axios";
axios.defaults.baseURL = process.env.GATSBY_API_URL;
axios.defaults.withCredentials = true;

//API calls

export const sendEmail = data => axios.post("/email/contactForm", data);

export const getExport = query =>
  axios.get("/home/all", { params: query, responseType: "blob" });

export const signUp = (email, password, isDemo) =>
  axios.post(`/auth/signup`, { email, password, isDemo });

export const logIn = (email, password) =>
  axios.post(`/auth/login`, { email, password });

export const changePassword = (newPassword, token) =>
  axios.post(`/auth/changepassword`, { newPassword, token });

export const requestPasswordReset = email =>
  axios.put(`/auth/requestpasswordreset`, { email });

export const deleteAccount = () => axios.get(`/auth/delete`);

export const logOut = () => axios.get("/auth/logout");

export const authCheck = () => axios.get("/auth/check");

export const getHomes = () => axios.get(`/home`);

export const updateHome = data => axios.post(`/home`, data);

export const getItemById = query => axios.get(`/item/id`, { params: query });

export const updateItem = data => axios.post(`/item`, data);

export const getUser = email => axios.get(`/user`, { params: { email } });

export const getTaskById = query => axios.get(`/task/id`, { params: query });

export const updateTask = data => axios.post(`/task`, data);

export const updateInstance = (data, taskId) =>
  axios.post(`/instance`, { data, taskId });

export const deleteInstance = (instanceId, taskId) =>
  axios.delete(`/instance/delete`, { params: { instanceId, taskId } });
