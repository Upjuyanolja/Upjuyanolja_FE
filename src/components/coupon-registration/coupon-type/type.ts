import { SetStateAction } from '@/types/setState';
import {
  DeterminedPrice,
  DiscountValue,
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
  setPendingCouponDataList: SetPendingCouponDataList;
  setDeterminedPrice: SetStateAction<DeterminedPrice>;
};
