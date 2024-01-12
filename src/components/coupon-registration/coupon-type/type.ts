import {
  DiscountValue,
  SelectedDiscountType,
  SetDiscountValue,
  SetPendingCouponDataList,
  SetSelectedDiscountType,
} from '../type';

export type CouponTypeProps = {
  selectedDiscountType: SelectedDiscountType;
  setSelectedDiscountType: SetSelectedDiscountType;
  discountValue: DiscountValue;
  setDiscountValue: SetDiscountValue;
  setPendingCouponDataList: SetPendingCouponDataList;
};
