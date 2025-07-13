import axios from "axios";
import { STORAGE_KEYS } from "./commons";
import { apiRoutes } from "./apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../services/navigationService";

const axiosInstance = axios.create({
    baseURL: apiRoutes.baseUrl,
    timeout: 10000,
})

// Axios interceptors
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
            console.log(`token: ${token}`);
            if (token) {
                config.headers['X-Access-Token'] = token || '';
            }
            if (config.data instanceof FormData) {
                config.headers['Content-Type'] = 'multipart/form-data';
            } else {
                config.headers['Content-Type'] = 'application/json';
            }
        } catch (error) {
            console.log(`AsyncStorage error: ${error}`);
        }
        return config;
    },
    error => Promise.reject(error)
)

//Axios response interceptor
axiosInstance.interceptors.response.use(
    async response => response,
    error => {
        if (error.response && error.response.status === 403 || error.response.status === 401) {
            AsyncStorage.clear()
            navigate('/');
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;