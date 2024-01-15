import {
  PendingCouponData,
  SelectedCouponType,
} from '@components/coupon-registration/type';

export type CouponPreviewItemProps = PendingCouponData & {
  selectedCouponType: SelectedCouponType;
  determinedPrice: string;
};
