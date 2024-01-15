import {
  PendingCouponDataList,
  SelectedCouponType,
  SetPendingCouponDataList,
} from '../type';

export type CouponApplierProps = {
  selectedCouponType: SelectedCouponType;
  pendingCouponDataList: PendingCouponDataList;
  setPendingCouponDataList: SetPendingCouponDataList;
};
