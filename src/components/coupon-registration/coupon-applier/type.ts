import {
  PendingCouponDataList,
  SelectedCouponType,
  SetPendingCouponDataList,
} from '../type';

export type CouponApplierProps = {
  selectedCouponType: SelectedCouponType;
  pendingCouponData: PendingCouponDataList;
  setPendingCouponDataList: SetPendingCouponDataList;
};
