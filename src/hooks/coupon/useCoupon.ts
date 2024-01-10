import { useGetCoupon } from '@queries/coupon';

export const useCoupon = () => {
  const { data: couponData, isError: isGetCouponError } = useGetCoupon({
    select(data) {
      return data.data.data;
    },
  });

  return {
    couponData,
    isGetCouponError,
  };
};
