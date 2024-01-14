import { useDeleteCoupon, useGetCoupon } from '@queries/coupon';
import { message } from 'antd';
import { AxiosError } from 'axios';
/**
 * @description 쿠폰 조회,수정,삭제 api 를 다루는 hook 
 * 
 * @returns
 *   isGetCouponError,
    couponData,
 */

export const useCoupon = () => {
  const {
    data,
    isError: isGetCouponError,
    refetch: getCouponRefetch,
  } = useGetCoupon({
    select(data) {
      return data.data.data;
    },
  });

  const { mutate: deleteCoupon } = useDeleteCoupon({
    onSuccess() {
      message.success('삭제되었습니다');
      getCouponRefetch();
    },
    onError(error) {
      if (error instanceof AxiosError)
        message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
    },
  });

  return {
    data,
    isGetCouponError,
    deleteCoupon,
  };
};
