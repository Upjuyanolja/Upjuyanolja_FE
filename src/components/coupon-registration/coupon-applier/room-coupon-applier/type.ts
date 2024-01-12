import {
  PendingCouponData,
  SetPendingCouponDataList,
} from '@components/coupon-registration/type';

export type RoomCouponApplierProps = {
  roomName: string;
  index: number;
  roomId: number;
  pendingCouponData: PendingCouponData;
  setPendingCouponDataList: SetPendingCouponDataList;
};
