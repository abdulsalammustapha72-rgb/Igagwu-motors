import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://igagwu-motors.onrender.com/api'
});

Api.interceptors.request.use((config) => {

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    };

    return config;

});

export default Api;
