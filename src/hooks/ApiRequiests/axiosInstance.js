import axios from 'axios';
import appUrls from '../../constant/appUrls';
import Storage from '../../utils/AsyncStorage';
export const axiosInstance = axios.create({
  baseURL: appUrls.BASE_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    let token = await Storage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Dispatch logout action (or handle as needed)
      // Example: store.dispatch(logout());
      console.log('Unauthorized. Token might be invalid or expired.');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
