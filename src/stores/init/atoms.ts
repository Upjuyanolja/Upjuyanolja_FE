import {
  Options,
  Image,
  UserInputValue,
} from '@components/init/init-accommodation-registration/type';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});

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
      rooms: [
        {
          name: '',
          price: null,
          defaultCapacity: null,
          maxCapacity: null,
          checkInTime: '',
          checkOutTime: '',
          count: null,
          images: [{ url: '' }],
          options: {
            airCondition: false,
            tv: false,
            internet: false,
          },
        },
      ],
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const isUploadedAccommodationImage = atom({
  key: 'isUploadedAccommodationImage',
  default: false,
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
