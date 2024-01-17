import {
  useBuyCoupon,
  useGetCouponRoomList,
} from '@queries/coupon-registration';
import { message } from 'antd';
import { AxiosError } from 'axios';

export const useCouponRegistration = () => {
  const { data: couponRoomListData, isError: isGetCouponRoomListError } =
    useGetCouponRoomList({
      select(data) {
        return data.data.data;
      },
    });

  const { mutate: buyCoupon } = useBuyCoupon({
    onSuccess() {
      message.success({
        content: '쿠폰을 구매하였습니다.',
        className: 'coupon-message',
      });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
      }
    },
  });

  return {
    couponRoomListData,
    isGetCouponRoomListError,
    buyCoupon,
  };
};
