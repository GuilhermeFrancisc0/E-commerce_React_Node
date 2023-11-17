import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const { VITE_API_BASE_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true
});

api.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken');
  request.headers.authorization = `Bearer ${accessToken}`;

  return Promise.resolve(request);
})

api.interceptors.response.use(
  response => response,
  async (error: AxiosError<{ message: string }>) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        if (!originalRequest)
          throw new Error('Original Request is Empty!');

        const { data: { accessToken } } = await api.get('/refreshToken');

        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (e) { }
    }

    toast.error(error.response?.data.message ?? error.message);

    return Promise.reject(error);
  }
);

export default api;
