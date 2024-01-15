import {
  GroupQuantityValue,
  SelectedCouponType,
  SetPendingCouponDataList,
} from '@components/coupon-registration/type';

export type RoomCouponApplierProps = {
  roomName: string;
  index: number;
  roomId: number;
  roomPrice: number;
  setPendingCouponDataList: SetPendingCouponDataList;
  isGroupQuantitySelected: boolean;
  groupQuantityValue: GroupQuantityValue;
  selectedCouponType: SelectedCouponType;
};
