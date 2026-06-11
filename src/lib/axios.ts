import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use 10.0.2.2 for Android Emulator or your local IP for physical devices
// We're using the local IP as established previously
const BASE_URL = 'http://192.168.1.8:4000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach the auth token and log request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      // Better-Auth expects Authorization: Bearer <token>
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log outgoing request details
    console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`, config.data ? '\nPayload:' : '', config.data || '');
    
    return config;
  },
  (error) => {
    console.error('[API REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// Response interceptor to log success and error details
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API SUCCESS] ${response.config.method?.toUpperCase()} ${response.config.url}`, '\nData:', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[API ERROR] ${error.response.config.method?.toUpperCase()} ${error.response.config.url}`);
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('[API NETWORK ERROR] No response received:', error.message);
    } else {
      console.error('[API SETUP ERROR]', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
