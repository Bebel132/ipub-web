import type { AxiosInstance } from "axios";
import axios from "axios";

const createApiInstance = (): AxiosInstance => {
    return axios.create({
        baseURL: 'http://127.0.0.1:5000/api',
    })
}

const api = createApiInstance();
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;