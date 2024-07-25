import axios  from "axios";

export default axios.create({
    baseURL: 'http://localhost:8000'
});






















// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const instance = axios.create({
//   baseURL: 'http://localhost:8000', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken');
//       if (refreshToken) {
//         try {
//           const response = await instance.post('/api/token/refresh/', { refresh: refreshToken });
//           const { accessToken } = response.data;
//           localStorage.setItem('accessToken', accessToken);
//           originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//           return instance(originalRequest);
//         } catch (err) {
//           console.error('Refresh token error:', err);
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('refreshToken');
//           window.location.href = '/login';
//         }
//       } else {
//         console.error('No refresh token available');
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
