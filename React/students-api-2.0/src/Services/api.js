import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7218'
})


export default api;