import { useGetCouponRoomList } from '@queries/coupon-registration';

export const useCouponRegistration = () => {
  const { data: couponRoomListData, isError: isGetCouponRoomListError } =
    useGetCouponRoomList({
      select(data) {
        return data.data.data;
      },
    });

  return {
    couponRoomListData,
    isGetCouponRoomListError,
  };
};
