import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7218',
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json' // Configuração para parse automático
});


export default api;