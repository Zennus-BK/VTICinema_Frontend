import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
});


// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//         config.headers.Authorization = 'Beaer ' + token
//     }
//     return config
// })

export default api;