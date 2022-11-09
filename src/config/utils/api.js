import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://192.168.1.21:3001/',
    timeout: 1000,
    headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MmZlMjI5MzM0NjdiNjZjYmUyMDIyMDQiLCJlbWFpbCI6Inpha2thQGdtYWlsLmNvbSIsImlhdCI6MTY2MDg5MjcxMH0.yng9l_8AqGOz4q4lxyCPNU4USzxpVf8ERAW8cwOrZw4` }
});

// request.interceptors.request.use(function (config) {
//     const token = '';
//     if (token) {
//         config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
//     } else {
//         config.headers.Authorization = '';
//     }
//     return config;
// });

