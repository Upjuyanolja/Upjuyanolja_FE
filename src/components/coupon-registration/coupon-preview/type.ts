import {
  DeterminedPrice,
  PendingCouponDataList,
  SelectedCouponType,
} from '../type';

export type CouponPreviewProps = {
  selectedCouponType: SelectedCouponType;
  determinedPrice: DeterminedPrice;
  pendingCouponData: PendingCouponDataList;
};
