import { atom } from 'recoil';
import { ImageFile } from './type';

export const priceHasError = atom<string | null>({
  key: 'hasError',
  default: null,
});

export const capacityHasError = atom<string | null>({
  key: 'capacityHasError',
  default: null,
});

export const checkedRoomOptions = atom({
  key: 'checkedAccommodationOptions',
  default: {
    airCondition: false,
    tv: false,
    internet: false,
  },
});

export const imageFileState = atom<ImageFile[]>({
  key: 'imageFileState',
  default: [],
});
