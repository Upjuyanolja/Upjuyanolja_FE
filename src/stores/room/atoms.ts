import { ImageFile } from '@stores/init/type';
import { atom } from 'recoil';

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

export const deletedImageFileState = atom<ImageFile[]>({
  key: 'deleteImageFileState',
  default: [],
});
