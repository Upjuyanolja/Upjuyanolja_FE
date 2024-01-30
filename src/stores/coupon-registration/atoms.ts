import {
  FlatDiscountType,
  RateDiscountType,
} from '@/constants/coupon-registration/type';
import {
  DeterminedPrice,
  DiscountValue,
  GroupQuantityValue,
  PendingRoomDataList,
} from '@components/domain/coupon-registration/type';
import { atom } from 'recoil';
import { FLAT_DISCOUNT_TYPE } from '@/constants/coupon-registration';
import { CouponRoomList } from '@api/coupon/type';

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

export const isTermsCheckedState = atom<boolean>({
  key: 'isTermsChecked',
  default: false,
});

export const totalPointsState = atom<number>({
  key: 'totalPoints',
  default: 0,
});

export const getCouponRoomDataListState = atom<CouponRoomList | undefined>({
  key: 'getCouponRoomDataList',
  default: undefined,
});

export const isActivityResetCouponState = atom<boolean>({
  key: 'isActivityResetCoupon',
  default: false,
});
