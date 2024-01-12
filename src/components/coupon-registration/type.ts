import {
  DiscountPriceType,
  DiscountRateType,
} from '@/constants/coupon-registration/type';
import { SetStateAction } from '@/types/setState';

export type SetPendingCouponDataList = SetStateAction<PendingCouponDataList>;
export type PendingCouponData = {
  roomId: number;
  roomName: string;
  quantity: string;
};
export type PendingCouponDataList = {
  roomId: number;
  roomName: string;
  quantity: string;
}[];

export type SelectedDiscountType = DiscountPriceType | DiscountRateType;
export type SetSelectedDiscountType = SetStateAction<
  DiscountPriceType | DiscountRateType
>;
export type DiscountValue = string;
export type SetDiscountValue = SetStateAction<DiscountValue>;
