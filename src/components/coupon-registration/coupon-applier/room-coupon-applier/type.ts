import {
  PendingCouponData,
  SelectedCouponType,
  SetPendingCouponDataList,
} from '@components/coupon-registration/type';

export type RoomCouponApplierProps = {
  roomName: string;
  index: number;
  roomId: number;
  roomPrice: number;
  pendingCouponData: PendingCouponData;
  setPendingCouponDataList: SetPendingCouponDataList;
  isGroupQuantitySelected: boolean;
  groupQuantityValue: number;
  selectedCouponType: SelectedCouponType;
};
