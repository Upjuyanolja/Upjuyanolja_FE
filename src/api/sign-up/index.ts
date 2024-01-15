import {
  AuthenticationData,
  GetVerificationData,
  PostAuthenticationData,
  PostSignUpResData,
  SignUpData,
  VerificationData,
} from './type';
import { instance } from '..';
import { Response } from '@/types/api';

export const SIGN_UP_API = {
  postSignUp: (data: SignUpData) =>
    instance.post<Response<PostSignUpResData>>('/api/auth/owners/signup', {
      data,
    }),
  postAuthentication: (data: AuthenticationData) =>
    instance.post<Response<PostAuthenticationData>>(
      '/api/auth/owners/request-email',
      data,
    ),
  getVerify: (data: VerificationData) =>
    instance.get<Response<GetVerificationData>>('/api/auth/owners/verify', {
      params: {
        email: data.email,
        verificationCode: data.verificationCode,
      },
    }),
};
