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

export const checkedRoomDetailOptions = atom({
  key: 'checkedRoomDetailOptions',
  default: {
    airCondition: false,
    tv: false,
    internet: false,
  },
});

export const imageRoomFileState = atom<ImageFile[]>({
  key: 'imageRoomFileState',
  default: [],
});

export const addedImageFileState = atom<ImageFile[]>({
  key: 'addedImageFileState',
  default: [],
});

export const deletedImageFileState = atom<ImageFile[]>({
  key: 'deleteImageFileState',
  default: [],
});
