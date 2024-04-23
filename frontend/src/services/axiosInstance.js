import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
  headers: {
    'Authorization': token ? `${token}` : ''
  }
});

export default instance;
