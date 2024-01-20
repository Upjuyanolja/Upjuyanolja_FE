import {
  Options,
  UserInputValue,
} from '@components/init/init-accommodation-registration/type';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ImageFile } from './type';

const { persistAtom } = recoilPersist({
  key: 'userInput',
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
      rooms: [],
      editRoomIndex: -1,
    },
  ],
  effects_UNSTABLE: [persistAtom],
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

export const accommodationEditState = atom({
  key: 'accommodationEditState',
  default: false,
});

export const imageFileState = atom<ImageFile[]>({
  key: 'imageFileState',
  default: [],
});
