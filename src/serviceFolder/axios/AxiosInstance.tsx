import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com/', // replace with real baseURL
});

let isRefreshing = false;

let waitedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

function processQueue(error: any, token: string | null) {
  waitedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  waitedQueue = [];
}

// Request Interceptor: Add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers && typeof config.headers === 'object') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalReq = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          waitedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalReq.headers && typeof originalReq.headers === 'object') {
            originalReq.headers['Authorization'] = `Bearer ${token}`;
          }
          return axiosInstance(originalReq);
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken') || '';
        const response = await axios.post('http://auth/refreshToken', { refreshToken });
        const newToken = response.data.token;

        localStorage.setItem('token', newToken);

        processQueue(null, newToken);

        if (originalReq.headers && typeof originalReq.headers === 'object') {
          originalReq.headers['Authorization'] = `Bearer ${newToken}`;
        }

        return axiosInstance(originalReq);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
