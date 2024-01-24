import { MemberData } from '@api/sign-in/type';
import { instance } from '..';
import { SignInData } from './type';

export const SIGN_IN_API = {
  postLogin: (data: SignInData) =>
    instance.post<MemberData>('/api/auth/owners/signin', data),
};
