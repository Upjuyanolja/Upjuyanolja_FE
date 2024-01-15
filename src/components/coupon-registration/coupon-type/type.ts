import { SetStateAction } from '@/types/setState';
import {
  DeterminedPrice,
  DiscountValue,
  PendingCouponDataList,
  SelectedCouponType,
  SetDiscountValue,
  SetPendingCouponDataList,
  SetSelectedCouponType,
} from '../type';

export type CouponTypeProps = {
  selectedCouponType: SelectedCouponType;
  setSelectedCouponType: SetSelectedCouponType;
  discountValue: DiscountValue;
  setDiscountValue: SetDiscountValue;
  pendingCouponDataList: PendingCouponDataList;
  setPendingCouponDataList: SetPendingCouponDataList;
  setDeterminedPrice: SetStateAction<DeterminedPrice>;
};
