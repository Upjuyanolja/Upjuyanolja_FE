import { SetStateAction } from '@/types/setState';
import { SelectedCouponType } from '@components/coupon-registration/type';

export type CommonQuantityCouponSetterProps = {
  selectedCouponType: SelectedCouponType;
  groupQuantityValue: number;
  setGroupQuantityValue: SetStateAction<number>;
  isGroupQuantitySelected: boolean;
  setIsGroupQuantitySelected: SetStateAction<boolean>;
};
