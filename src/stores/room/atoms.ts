import { atom } from 'recoil';

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
