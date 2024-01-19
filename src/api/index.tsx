import axios from 'axios';
import { HTTP_BASE_URL, HTTP_STATUS_CODE } from '../constants/api';
import { getCookie, removeCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { message } from 'antd';
import { TextBox } from '@components/text-box';

export const instance = axios.create({
  baseURL: HTTP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
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
    if (
      window.location.pathname !== '/signin' &&
      error?.response.status === HTTP_STATUS_CODE.UNAUTHORIZED
    ) {
      const refreshToken = getCookie('refreshToken');
      if (refreshToken) {
        try {
          // 여기에 재발급 api 선언, 아래는 예시
          const newAccessToken = 'ivegaeul';
          setCookie('accessToken', newAccessToken);
          return axios(error.config);
        } catch (refreshError) {
          message.error({
            content: (
              <TextBox typography="body3" fontWeight={'400'}>
                인증 만료 입니다.
              </TextBox>
            ),
            duration: 2,
          });
          setTimeout(() => {
            window.location.href = '/signin';
          }, 1000);
          return Promise.reject(refreshError);
        }
      } else {
        message.error({
          content: (
            <TextBox typography="body3" fontWeight={'400'}>
              로그인 만료 입니다.
            </TextBox>
          ),
          duration: 2,
        });
        setTimeout(() => {
          window.location.href = '/signin';
        }, 1000);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
