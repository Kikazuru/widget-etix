import axios from 'axios'
import store from './store'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
})

api.interceptors.request.use(function (config) {
    const token = store.state.guestToken
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default api



