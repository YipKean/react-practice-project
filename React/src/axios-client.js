import axios from "axios";
import { useStateContext } from "./contexts/contextProvider";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Ensure this matches your API endpoint
    headers: {
        'Content-Type': 'application/json'
    }
});

//use b4 the request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    config.headers.Authorization = `Bearer ${token}`
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;

}, (error) => {

    try {
        const { response } = error;

        if (response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    } catch (e) {
        console.error(e);
    }

    throw error;
})

export default axiosClient;
