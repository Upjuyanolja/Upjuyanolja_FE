import {
  Options,
  Image,
  UserInputValue,
} from '@components/init/init-accommodation-registration/type';
import { atom } from 'recoil';

export const userInputValueState = atom<UserInputValue[]>({
  key: 'userInputValueState',
  default: [
    {
      name: '',
      address: '',
      detailAddress: '',
      zipCode: '',
      description: '',
      type: '',
      images: [{ url: '' }],
      options: {
        cooking: false,
        parking: false,
        pickup: false,
        barbecue: false,
        fitness: false,
        karaoke: false,
        sauna: false,
        sports: false,
        seminar: false,
      },
      rooms: [],
    },
  ],
});

export const checkedRoomOptions = atom({
  key: 'checkedAccommodationOptions',
  default: {
    airCondition: false,
    tv: false,
    internet: false,
  },
});

export const checkedAccommodationOptions = atom<Options>({
  key: 'checkedRoomOptions',
  default: {
    cooking: false,
    parking: false,
    pickup: false,
    barbecue: false,
    fitness: false,
    karaoke: false,
    sauna: false,
    sports: false,
    seminar: false,
  },
});

export const selectedAccommodationFilesState = atom<Image[]>({
  key: 'selectedAccommodationFilesState',
  default: [],
});

export const selectedInitRoomFilesState = atom<Image[]>({
  key: 'selectedInitRoomFilesState',
  default: [],
});
