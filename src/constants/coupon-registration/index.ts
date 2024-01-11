import { DiscountPriceType, DiscountRateType } from './type';

export const DISCOUNT_PRICE = 'price';

export const DISCOUNT_RATE = 'percent';

export const DISCOUNT_PRICE_TYPE: DiscountPriceType = {
  typeName: DISCOUNT_PRICE,
  min: 1000,
  max: 50000,
  errorMessage: '1,000원 단위로 최대 50,000원까지 입력 가능합니다.',
};
export const DISCOUNT_RATE_TYPE: DiscountRateType = {
  typeName: DISCOUNT_RATE,
  min: 1,
  max: 50,
  errorMessage: '1~50까지 입력 가능합니다.',
};

export const DISCOUNT_VALUE_INIT = 0;
