import {
  AccommodationOptions,
  RoomOptions,
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
      thumbnail: '',
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
      isAccommodationEdit: false,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const checkedRoomOptions = atom<RoomOptions>({
  key: 'checkedRoomOptions',
  default: {
    airCondition: false,
    tv: false,
    internet: false,
  },
});

export const checkedAccommodationOptions = atom<AccommodationOptions>({
  key: 'checkedAccommodationOptions',
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

export const imageFileState = atom<ImageFile[]>({
  key: 'imageFileState',
  default: [],
});

/** 숙소 정보를 입력했는지 여부 */
const { persistAtom: updateAccommodationPersist } = recoilPersist({
  key: 'isUpdatedAccommodationState',
  storage: localStorage,
});

export const isUpdatedAccommodationState = atom({
  key: 'isUpdatedAccommodation',
  default: false,
  effects_UNSTABLE: [updateAccommodationPersist],
});

/** 객실 정보를 입력했는지 여부 */
const { persistAtom: updateRoomPersist } = recoilPersist({
  key: 'isUpdatedRoomState',
  storage: localStorage,
});

export const isUpdatedRoomState = atom({
  key: 'isUpdatedRoom',
  default: false,
  effects_UNSTABLE: [updateRoomPersist],
});

/** 객실 추가하기 버튼을 눌렀는지 여부 */
const { persistAtom: addRoomPersist } = recoilPersist({
  key: 'addRoomState',
  storage: localStorage,
});

export const addRoomState = atom({
  key: 'addRoomState',
  default: false,
  effects_UNSTABLE: [addRoomPersist],
});

/** 객실 페이지에서 이전 버튼을 눌렀을 때 */
const { persistAtom: clickPrevButtonInRoomRegistration } = recoilPersist({
  key: 'clickPrevButtonInRoomRegistration',
  storage: localStorage,
});

export const roomPrevButtonState = atom({
  key: 'roomPrevButtonState',
  default: false,
  effects_UNSTABLE: [clickPrevButtonInRoomRegistration],
});
