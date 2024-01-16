import {
  FlatDiscountType,
  RateDiscountType,
} from '@/constants/coupon-registration/type';
import { SetStateAction } from '@/types/setState';

export type SetPendingCouponDataList = SetStateAction<PendingCouponDataList>;
export type PendingCouponData = {
  roomId: number;
  roomName: string;
  quantity: string;
  roomPrice: number;
};
export type PendingCouponDataList = PendingCouponData[];

export type SelectedDiscountType = FlatDiscountType | RateDiscountType;

export type DiscountValue = string;

export type DeterminedPrice = string;

export type GroupQuantityValue = string;
