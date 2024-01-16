import { FLAT_DISCOUNT_TYPE } from '@/constants/coupon-registration';
import {
  FlatDiscountType,
  RateDiscountType,
} from '@/constants/coupon-registration/type';
import {
  DeterminedPrice,
  DiscountValue,
  GroupQuantityValue,
  PendingCouponDataList,
} from '@components/coupon-registration/type';
import { atom } from 'recoil';

export const selectedDiscountTypeState = atom<
  FlatDiscountType | RateDiscountType
>({
  key: 'selectedDiscountType',
  default: FLAT_DISCOUNT_TYPE,
});

export const discountValueState = atom<DiscountValue>({
  key: 'discountValue',
  default: '',
});

export const determinedPriceState = atom<DeterminedPrice>({
  key: 'determinedPrice',
  default: '',
});

export const pendingCouponDataListState = atom<PendingCouponDataList>({
  key: 'pendingCouponDataList',
  default: [
    {
      roomId: 0,
      roomName: '',
      quantity: '',
      roomPrice: 0,
    },
  ],
});

export const groupQuantityValueState = atom<GroupQuantityValue>({
  key: 'groupQuantityValue',
  default: '',
});

export const isGroupQuantitySelectedState = atom<boolean>({
  key: 'isGroupQuantitySelected',
  default: false,
});
