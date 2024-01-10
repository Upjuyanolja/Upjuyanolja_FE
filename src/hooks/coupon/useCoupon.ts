import {
  COUPON_STATUS_DISABLE,
  COUPON_STATUS_ENABLE,
} from '@/constants/coupon';
import { useGetCoupon } from '@queries/coupon';

export const useCoupon = () => {
  const { data: couponData, isError: isGetCouponError } = useGetCoupon({
    select(data) {
      return data.data.data;
    },
  });

  const couponStatusOption = [
    { value: COUPON_STATUS_ENABLE.value, label: COUPON_STATUS_ENABLE.label },
    { value: COUPON_STATUS_DISABLE.value, label: COUPON_STATUS_DISABLE.label },
  ];

  return {
    couponData,
    isGetCouponError,
    couponStatusOption,
  };
};
