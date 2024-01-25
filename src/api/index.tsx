import axios from 'axios';
import { HTTP_STATUS_CODE } from '../constants/api';
import { getCookie, removeCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { REFRESH_API } from './refresh';
import { message } from 'antd';
import { ROUTES } from '@/constants/routes';
import { isAccessTokenExpired } from '@/utils/refresh';

export const instance = axios.create({
  // baseURL: '',
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleUnauthorized = () => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  removeCookie('accommodationId');
  localStorage.clear();
  message.error('로그인 만료 입니다.');
  window.location.replace('/signin');
};

instance.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      const isTokenExpired = isAccessTokenExpired(accessToken);
      if (isTokenExpired) {
        try {
          const res = await REFRESH_API.postRefresh({
            accessToken: accessToken,
            refreshToken: getCookie('refreshToken') as string,
          });
          config.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
          setCookie('accessToken', res.data.accessToken);
          setCookie('refreshToken', res.data.refreshToken);
        } catch (refreshError) {
          console.log('재발급 실패');
        }
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    // 여기 뺐습니다.
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
