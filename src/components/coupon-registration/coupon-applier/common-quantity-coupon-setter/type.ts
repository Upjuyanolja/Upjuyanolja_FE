import { SetStateAction } from '@/types/setState';
import {
  GroupQuantityValue,
  SelectedCouponType,
  SetGroupQuantityValue,
} from '@components/coupon-registration/type';

export type CommonQuantityCouponSetterProps = {
  selectedCouponType: SelectedCouponType;
  groupQuantityValue: GroupQuantityValue;
  setGroupQuantityValue: SetGroupQuantityValue;
  isGroupQuantitySelected: boolean;
  setIsGroupQuantitySelected: SetStateAction<boolean>;
};
