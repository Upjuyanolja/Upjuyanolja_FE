import {
  COUPON_STATUS_DISABLE,
  COUPON_STATUS_ENABLE,
  COUPON_TYPE_ALL_DAYS,
  COUPON_TYPE_WEEKDAYS,
  COUPON_TYPE_WEEKENDS,
} from '@/constants/coupon';
import { room } from '@api/coupon/type';
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

  const couponTypeOption = [
    { value: COUPON_TYPE_ALL_DAYS.value, label: COUPON_TYPE_ALL_DAYS.label },
    { value: COUPON_TYPE_WEEKDAYS.value, label: COUPON_TYPE_WEEKDAYS.label },
    { value: COUPON_TYPE_WEEKENDS.value, label: COUPON_TYPE_WEEKENDS.label },
  ];

  const processCouponTableData = (data: room[]) => {
    const couponTableData = [];
    let key = -1;
    for (const room of data) {
      for (let index = 0; index < room.coupons.length; index++) {
        key++;
        const coupon = room.coupons[index];
        const length = index === 0 ? room.coupons.length : 0;
        couponTableData.push({
          room: {
            name: room.roomName,
            price: room.roomPrice,
            id: room.roomId,
            length,
          },
          key,
          couponId: coupon.couponId,
          status: coupon.status,
          info: {
            name: coupon.couponName,
            appliedPrice: coupon.appliedPrice,
          },
          dayLimit: coupon.dayLimit,
          quantity: coupon.quantity,
          couponType: coupon.couponType,
          discount: coupon.discount,
          discountType: coupon.discountType,
          isSoldOut: coupon.status === 'SOLD_OUT',
        });
      }
    }
    return couponTableData;
  };

  return {
    couponData,
    isGetCouponError,
    couponStatusOption,
    couponTypeOption,
    processCouponTableData,
  };
};
