import { DISCOUNT_TYPE } from '@/constants/coupon';
import { coupon } from '@api/coupon/type';

export const calculatedCouponPoints = (
  price: number,
  discount: number,
  discountType: coupon['discountType'],
) => {
  const rateTypeRoundingUnit = 1000;
  const roundingUnit = 10;
  let unitPrice = 0;
  if (discountType === DISCOUNT_TYPE.RATE) {
    unitPrice = (price * discount) / rateTypeRoundingUnit;
    unitPrice = Math.floor(unitPrice / roundingUnit) * roundingUnit;
  }
  if (discountType === DISCOUNT_TYPE.FLAT) {
    unitPrice = discount / roundingUnit;
  }
  const roundedUnitPrice = Math.floor(unitPrice / roundingUnit) * roundingUnit;
  return roundedUnitPrice;
};
