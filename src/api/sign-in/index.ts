import { memberData } from '@api/sign-in/type';
import { instance } from '..';
import { signInData } from './type';
import { Response } from '@/types/api';

export const SIGN_IN_API = {
  postLogin: (data: signInData) =>
    instance.post<Response<memberData>>('/api/auth/owner/signin', {
      data,
    }),
};
