import { DISCOUNT_TYPE } from '@/constants/coupon';
import { coupon } from '@api/coupon/type';

export const calculatedCouponPoints = (
  price: number,
  discount: number,
  discountType: coupon['discountType'],
) => {
  const roundingUnit = 10;
  let unitPrice = 0;
  if (discountType === DISCOUNT_TYPE.RATE) {
    unitPrice = price / discount / roundingUnit;
  }
  if (discountType === DISCOUNT_TYPE.FLAT) {
    unitPrice = discount / roundingUnit;
  }
  const roundedUnitPrice = Math.floor(unitPrice / roundingUnit) * roundingUnit;
  return roundedUnitPrice;
};
