import { SetStateAction } from '@/types/setState';
import { SelectedCouponType } from '@components/coupon-registration/type';

export type CommonQuantityCouponSetterProps = {
  selectedCouponType: SelectedCouponType;
  groupQuantityValue: string;
  setGroupQuantityValue: SetStateAction<string>;
  isGroupQuantitySelected: boolean;
  setIsGroupQuantitySelected: SetStateAction<boolean>;
};
