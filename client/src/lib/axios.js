import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? 'http://localhost:8000/api' : '/api', // Replace with your server URL
  withCredentials : true, //
})