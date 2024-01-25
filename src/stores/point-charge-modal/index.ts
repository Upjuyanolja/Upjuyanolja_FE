import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const currentUrlState = atom({
  key: 'currentUrlState',
  default: '/1/main',
  effects_UNSTABLE: [persistAtom],
});
