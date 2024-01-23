import axios from 'axios';
import { HTTP_STATUS_CODE } from '../constants/api';
import { getCookie, removeCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { message } from 'antd';
import { TextBox } from '@components/text-box';
import { ROUTES } from '@/constants/routes';
import { REFRESH_API } from './refresh';

export const instance = axios.create({
  // baseURL: '',
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    timeout: 5000,
  },
});

instance.interceptors.request.use(
  (config) => {
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
  (response) => {
    return response;
  },
  async (error) => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (error.response.status === HTTP_STATUS_CODE.NOTFOUND) {
      console.log('404페이지로 이동');
    } else if (
      window.location.pathname !== ROUTES.SIGNIN &&
      window.location.pathname !== ROUTES.SIGNUP &&
      window.location.pathname !== ROUTES.SIGNIN_AGREEMENT &&
      window.location.pathname !== ROUTES.SIGNUP_SUCCESS &&
      error.response.status === HTTP_STATUS_CODE.UNAUTHORIZED &&
      accessToken
    ) {
      try {
        const response = await REFRESH_API.postRefresh({
          accessToken: accessToken,
          refreshToken: refreshToken as string,
        });
        removeCookie('accessToken');
        removeCookie('refreshToken');
        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;
        setCookie('accessToken', newAccessToken);
        setCookie('refreshToken', newRefreshToken);
      } catch (error) {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        removeCookie('accommodationId');
        message.error({
          content: (
            <TextBox typography="body3" fontWeight={'400'}>
              로그인 만료입니다.
            </TextBox>
          ),
          duration: 2,
        });
        setTimeout(() => {
          window.location.href = ROUTES.SIGNIN;
        }, 1000);
      }
      return axios(error.config);
    } else if (
      !accessToken &&
      window.location.pathname !== ROUTES.SIGNIN &&
      window.location.pathname !== ROUTES.SIGNUP &&
      window.location.pathname !== ROUTES.SIGNIN_AGREEMENT &&
      window.location.pathname !== ROUTES.SIGNUP_SUCCESS
    ) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
      removeCookie('accommodationId');
      localStorage.clear();
      setTimeout(() => {
        window.location.href = ROUTES.SIGNIN;
      }, 1000);
    }
    return Promise.reject(error);
  },
);

export default instance;
