import axios, { AxiosError } from 'axios';
import { HTTP_STATUS_CODE } from '../constants/api';
import { getCookie, removeCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { message } from 'antd';
import { TextBox } from '@components/text-box';
import { ROUTES } from '@/constants/routes';
import { usePostRefresh } from '@queries/refresh';

export const instance = axios.create({
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
    if (response.status === HTTP_STATUS_CODE.NOTFOUND) {
      // 콘솔 지우고 바로 404 페이지로 넘어가게 할 예정
      console.log('404 페이지로 넘어가야 함!');
    }
    return response;
  },
  async (error) => {
    const accessToken = getCookie('accessToken');
    if (
      window.location.pathname !== ROUTES.SIGNIN &&
      window.location.pathname !== ROUTES.SIGNUP &&
      window.location.pathname !== ROUTES.SIGNIN_AGREEMENT &&
      window.location.pathname !== ROUTES.SIGNUP_SUCCESS &&
      !accessToken
    ) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
      removeCookie('accommodationId');
      setTimeout(() => {
        window.location.href = ROUTES.SIGNIN;
      }, 1000);
      return Promise.reject(error);
    } else if (
      window.location.pathname !== ROUTES.SIGNIN &&
      window.location.pathname !== ROUTES.SIGNUP &&
      window.location.pathname !== ROUTES.SIGNIN_AGREEMENT &&
      window.location.pathname !== ROUTES.SIGNUP_SUCCESS &&
      error.response.status === HTTP_STATUS_CODE.UNAUTHORIZED &&
      accessToken
    ) {
      try {
        const postRefreshMutation = usePostRefresh({
          onSuccess(response) {
            removeCookie('accessToken');
            removeCookie('refreshToken');
            const newAccessToken = response.data.data.accessToken;
            const newRefreshToken = response.data.data.refreshToken;
            setCookie('accessToken', newAccessToken);
            setCookie('refreshToken', newRefreshToken);
          },
          onError(error) {
            if (error instanceof AxiosError)
              message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
          },
        });
        postRefreshMutation.mutate({
          accessToken: accessToken,
        });
        return axios(error.config);
      } catch (refreshError) {
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
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
