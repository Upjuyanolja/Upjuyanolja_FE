import { MemberData } from '@api/sign-in/type';
import { instance } from '..';
import { SignInData } from './type';
import { Response } from '@/types/api';

export const SIGN_IN_API = {
  postLogin: (data: SignInData) =>
    instance.post<Response<MemberData>>('/api/auth/owners/signin', {
      data,
    }),
};
