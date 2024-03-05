import axios from 'axios';
// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000, // 设置请求超时时间
});

// 拦截请求，设置请求头等信息
instance.interceptors.request.use(
  (config) => {
    // 在这里添加请求头
    config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['authorization'] = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).authorization || '' : '';
    // 可以添加其他请求头或修改配置
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);
