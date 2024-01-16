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
