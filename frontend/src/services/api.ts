import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const { VITE_API_BASE_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message: string }>) => {
    toast.error(error.response?.data.message ?? error.message);

    return Promise.reject(error);
  }
);

export default api;
