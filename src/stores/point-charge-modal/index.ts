import { atom } from 'recoil';

export const currentUrlState = atom({
  key: 'currentUrlState',
  default: '/1/main',
});
