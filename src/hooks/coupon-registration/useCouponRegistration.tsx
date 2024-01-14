import { useGetCouponRoomList } from '@queries/coupon';

export const useCouponRegistration = () => {
  const { data: couponRoomListData, isError: isGetCouponRoomListError } =
    useGetCouponRoomList({
      select(data) {
        return data.data.data;
      },
    });

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return {
    handleEnterKeyDown,
    couponRoomListData,
    isGetCouponRoomListError,
  };
};
