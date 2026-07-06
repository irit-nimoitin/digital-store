import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    if (error.request) {
      return Promise.reject({ detail: 'Network error. Please check your connection.' });
    }
    return Promise.reject({ detail: 'An unexpected error occurred.' });
  }
);

export default apiClient;
