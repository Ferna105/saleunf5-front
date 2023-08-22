import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      //TODO: Manejar 401 para refresh token
    }
    return Promise.reject(error);
  },
);

export {axiosInstance};
