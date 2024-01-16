import {
  FlatDiscountType,
  RateDiscountType,
} from '@/constants/coupon-registration/type';
import { SetStateAction } from '@/types/setState';

export type SetPendingCouponDataList = SetStateAction<PendingCouponDataList>;
export type PendingCouponData = {
  roomId: RoomId;
  roomName: string;
  quantity: string;
  roomPrice: number;
};
export type PendingCouponDataList = PendingCouponData[];

export type SelectedDiscountType = FlatDiscountType | RateDiscountType;

export type DiscountValue = string;

export type DeterminedPrice = string;

export type GroupQuantityValue = string;

export type PendingRoomData = {
  isChecked: boolean;
  roomId: RoomId;
  roomName: string;
  discountType: string;
  discount: number;
  quantity: number;
  eachPrice: number;
};

export type PendingRoomDataList = PendingRoomData[];

export type AccommodationId = number;
export type BuyCouponTotalPoints = number;
export type RoomId = number;
export type BuyCouponDiscount = number;
export type BuyCouponQuantity = number;
export type BuyCouponEachPoint = number;
