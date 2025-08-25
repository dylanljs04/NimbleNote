import axios from 'axios';

// Theres no local host in prod, so we need this to be dynamic
const BASE_URL = import.meta.env.mode === "development" ? "http://localhost:5001/api/" : "/api"
const api = axios.create({
    baseURL: BASE_URL;
})

export default api;