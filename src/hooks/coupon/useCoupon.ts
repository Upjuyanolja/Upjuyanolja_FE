import { useGetCoupon } from '@queries/coupon';
/**
 * @description 쿠폰 조회,수정,삭제 api 를 다루는 hook 
 * 
 * @returns
 *   isGetCouponError,
    couponData,
 */

export const useCoupon = () => {
  const { data: couponData, isError: isGetCouponError } = useGetCoupon({
    select(data) {
      return data.data.data;
    },
  });

  return {
    isGetCouponError,
    couponData,
  };
};
