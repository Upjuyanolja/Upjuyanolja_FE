import {
  FlatDiscountType,
  RateDiscountType,
} from '@/constants/coupon-registration/type';
import {
  DeterminedPrice,
  DiscountValue,
  GroupQuantityValue,
  PendingCouponDataList,
  PendingRoomDataList,
} from '@components/coupon-registration/type';
import { atom } from 'recoil';
import { FLAT_DISCOUNT_TYPE } from '@/constants/coupon-registration';

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

export const groupQuantityValueState = atom<GroupQuantityValue>({
  key: 'groupQuantityValue',
  default: '',
});

export const isGroupQuantitySelectedState = atom<boolean>({
  key: 'isGroupQuantitySelected',
  default: false,
});

export const pendingRoomDataListState = atom<PendingRoomDataList>({
  key: 'pendingRoomDataList',
  default: [],
});

export const isValidCouponRegistrationState = atom<boolean>({
  key: 'isValidCouponRegistration',
  default: false,
});
