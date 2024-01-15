import { SetStateAction } from '@/types/setState';
import {
  SelectedCouponType,
  SetGroupQuantityValue,
} from '@components/coupon-registration/type';

export type CommonQuantityCouponSetterProps = {
  selectedCouponType: SelectedCouponType;
  setGroupQuantityValue: SetGroupQuantityValue;
  isGroupQuantitySelected: boolean;
  setIsGroupQuantitySelected: SetStateAction<boolean>;
};
