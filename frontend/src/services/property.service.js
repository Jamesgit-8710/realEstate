import instance from "./axiosInstance";

export const propertyList = (query) => instance.get('/properties'+query);

export const addProperty = (data) => instance.post('/properties',data);
