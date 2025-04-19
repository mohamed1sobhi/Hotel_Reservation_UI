import asxios from 'axios';

const axiosInstance = asxios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
})

axiosInstance.interceptors.use((config)=>{
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}
, (error) => {
    return Promise.reject(error)
})

export default axiosInstance;