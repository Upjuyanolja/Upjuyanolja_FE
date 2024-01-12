import { FlatCouponType, RateCouponType } from './type';

export const FLAT_COUPON = 'FLAT';

export const RATE_COUPON = 'RATE';

export const FLAT_COUPON_TYPE: FlatCouponType = {
  typeName: FLAT_COUPON,
  min: 1000,
  max: 50000,
  errorMessage: '1,000원 단위로 최대 50,000원까지 입력 가능합니다.',
};
export const RATE_COUPON_TYPE: RateCouponType = {
  typeName: RATE_COUPON,
  min: 1,
  max: 50,
  errorMessage: '1~50까지 입력 가능합니다.',
};

export const DISCOUNT_VALUE_INIT = 0;
