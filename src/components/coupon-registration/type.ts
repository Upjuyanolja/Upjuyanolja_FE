import {
  FlatCouponType,
  RateCouponType,
} from '@/constants/coupon-registration/type';
import { SetStateAction } from '@/types/setState';

export type SetPendingCouponDataList = SetStateAction<PendingCouponDataList>;
export type PendingCouponData = {
  roomId: number;
  roomName: string;
  quantity: number;
  roomPrice?: number;
};
export type PendingCouponDataList = {
  roomId: number;
  roomName: string;
  quantity: number;
  roomPrice?: number;
}[];

export type SelectedCouponType = FlatCouponType | RateCouponType;
export type SetSelectedCouponType = SetStateAction<
  FlatCouponType | RateCouponType
>;
export type DiscountValue = string;
export type SetDiscountValue = SetStateAction<DiscountValue>;

export type DeterminedPrice = string;
export type SetDeterminedPrice = SetStateAction<DeterminedPrice>;
