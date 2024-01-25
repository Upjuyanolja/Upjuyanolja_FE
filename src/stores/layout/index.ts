import { atom } from 'recoil';

export const isSideBarOpenState = atom<boolean>({
  key: 'isSideBarOpen',
  default: false,
});
