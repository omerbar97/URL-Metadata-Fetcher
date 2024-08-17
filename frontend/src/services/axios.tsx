// src/utils/axiosInstance.ts
import axios from 'axios';

console.log(import.meta.env)

const axiosInstance = axios.create({
  baseURL: import.meta.env.SERVER_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
