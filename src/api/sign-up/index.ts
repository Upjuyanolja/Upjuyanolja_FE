import {
  authenticationData,
  getVerificationData,
  postAuthenticationData,
  postSignUpResData,
  signUpData,
  verificationData,
} from './type';
import { instance } from '..';
import { Response } from '@/types/api';

export const SIGN_UP_API = {
  postSignUp: (data: signUpData) =>
    instance.post<Response<postSignUpResData>>('/api/auth/owners/signup', {
      data,
    }),
  postAuthentication: (data: authenticationData) =>
    instance.post<Response<postAuthenticationData>>(
      '/api/auth/owners/request-email',
      data,
    ),
  getVerify: (data: verificationData) =>
    instance.get<Response<getVerificationData>>('/api/auth/owners/verify', {
      params: {
        email: data.email,
        verificationCode: data.verificationCode,
      },
    }),
};
