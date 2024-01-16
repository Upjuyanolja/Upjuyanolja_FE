import { FlatDiscountType, RateDiscountType } from './type';

export const FLAT_DISCOUNT = 'FLAT';

export const RATE_DISCOUNT = 'RATE';

export const FLAT_DISCOUNT_TYPE: FlatDiscountType = {
  typeName: FLAT_DISCOUNT,
  min: 1000,
  max: 50000,
};
export const RATE_DISCOUNT_TYPE: RateDiscountType = {
  typeName: RATE_DISCOUNT,
  min: 1,
  max: 50,
};

export const DISCOUNT_VALUE_INIT = 0;
