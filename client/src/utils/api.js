import axios from "axios";
axios.defaults.baseURL = process.env.GATSBY_API_URL;
axios.defaults.withCredentials = true;

//API calls

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
