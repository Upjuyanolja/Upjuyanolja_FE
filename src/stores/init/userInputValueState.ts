import { UserInputValue } from '@components/init/init-accommodation-registration/type';
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
      id: null,
      name: '',
      address: '',
      detailAddress: '',
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
