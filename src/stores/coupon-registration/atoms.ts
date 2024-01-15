import { FLAT_COUPON_TYPE } from '@/constants/coupon-registration';
import {
  FlatCouponType,
  RateCouponType,
} from '@/constants/coupon-registration/type';
import {
  DeterminedPrice,
  DiscountValue,
  GroupQuantityValue,
  PendingCouponDataList,
} from '@components/coupon-registration/type';
import { atom } from 'recoil';

export const selectedDiscountTypeState = atom<FlatCouponType | RateCouponType>({
  key: 'selectedDiscountType',
  default: FLAT_COUPON_TYPE,
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
  default: [],
});

export const groupQuantityValueState = atom<GroupQuantityValue>({
  key: 'groupQuantityValue',
  default: 0,
});

export const isGroupQuantitySelectedState = atom<boolean>({
  key: 'isGroupQuantitySelected',
  default: false,
});
