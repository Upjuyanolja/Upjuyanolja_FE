import { memberData } from '@api/sign-in/type';
import { instance } from '..';
import { signInData } from './type';
import { Response } from '@/types/apis';

export const SIGN_IN_API = {
  postLogin: (data: signInData) =>
    instance.post<Response<memberData>>('/api/auth/owner/signin', {
      data,
    }),
  getAccomodations: () => instance.get('/api/accommodations/backoffice'),
};
