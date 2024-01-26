import { getCookie } from '@hooks/sign-in/useSignIn';
import { atom } from 'recoil';

export const accommodationState = atom({
  key: 'accommodationState',
  default: Number(getCookie('accommodationId')),
});
