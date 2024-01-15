import { FlatCouponType, RateCouponType } from './type';

export const FLAT_COUPON = 'FLAT';

export const RATE_COUPON = 'RATE';

export const FLAT_COUPON_TYPE: FlatCouponType = {
  typeName: FLAT_COUPON,
  min: 1000,
  max: 50000,
};
export const RATE_COUPON_TYPE: RateCouponType = {
  typeName: RATE_COUPON,
  min: 1,
  max: 50,
};

export const DISCOUNT_VALUE_INIT = 0;
