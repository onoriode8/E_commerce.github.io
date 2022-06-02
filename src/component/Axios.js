import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : "https://shopping-661af-default-rtdb.firebaseio.com"
});

export default axiosInstance;