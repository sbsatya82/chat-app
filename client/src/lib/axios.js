import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your server URL
  withCredentials : true, //
})