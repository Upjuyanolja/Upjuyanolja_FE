export const DISCOUNT_PRICE_NUM = {
  min: 1000,
  max: 50000,
} as const;

export const DISCOUNT_RATE_NUM = {
  min: 1,
  max: 50,
} as const;

export const DISCOUNT_VALUE_INIT = 0;

export const DISCOUNT_PRICE = 'price';

export const DISCOUNT_RATE = 'percent';

export const COUPON_ERROR_MESSAGE = {
  invalidPriceRange: '1,000원 단위로 최대 50,000원까지 입력 가능합니다.',
  invalidRateRange: '1~50까지 입력 가능합니다.',
} as const;

export const COUPON_STATUS_ENABLE = {
  value: 'ENABLE',
  label: '발급 중',
} as const;

export const COUPON_STATUS_DISABLE = {
  value: 'DISABLE',
  label: '발급 중지',
} as const;

export const COUPON_STATUS_SOLD_OUT = {
  value: 'SOLD_OUT',
  label: '소진',
} as const;

export const COUPON_TYPE_WEEKENDS = {
  value: 'WEEKENDS',
  label: '휴일',
} as const;

export const COUPON_TYPE_WEEKDAYS = {
  value: 'WEEKDAYS',
  label: '주중',
} as const;

export const COUPON_TYPE_ALL_DAYS = {
  value: 'ALL_DAYS',
  label: '상시',
} as const;
