import { SetStateAction } from '@/types/setState';

export type CommonQuantityCouponSetterProps = {
  groupQuantityValue: string;
  setGroupQuantityValue: SetStateAction<string>;
  isGroupQuantitySelected: boolean;
  setIsGroupQuantitySelected: SetStateAction<boolean>;
};
