import instance from "./axiosInstance";

export const signup = (data) => instance.post('/users/signup', data);

export const login = (data) => instance.post('/users/login', data);

export const verify = () => instance.get('/users/verify');
