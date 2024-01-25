import axios from 'axios';
import { HTTP_STATUS_CODE, RESPONSE_CODE } from '../constants/api';
import { getCookie, removeCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { REFRESH_API } from './refresh';
import { message } from 'antd';

export const instance = axios.create({
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
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
      if (error.response?.data && 'code' in error.response.data) {
        // 리프레시 토큰이 유효하지 않을 때
        if (error.response.data.code === RESPONSE_CODE.INVALID_REFRESH_TOKEN) {
          handleUnauthorized();
        }
      } else {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
          const res = await REFRESH_API.postRefresh({
            accessToken: accessToken,
            refreshToken: getCookie('refreshToken') as string,
          });
          setCookie('accessToken', res.data.accessToken);
          setCookie('refreshToken', res.data.refreshToken);
        } else {
          removeCookie('accessToken');
          removeCookie('refreshToken');
          removeCookie('accommodationId');
          window.location.replace('/signin');
        }
      }
    }
    return Promise.reject(error);
  },
);
