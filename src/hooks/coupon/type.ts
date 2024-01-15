import { tableData } from '@components/coupon/table/type';

export type CouponData = {
  expiry: string;
  coupons: tableData[];
};

export type PurchaseCoupons = {
  name: string;
  points: number;
  numberOfCoupons: number;
  totalPoints: number;
  couponId: number;
};

export type PurchaseRoom = {
  roomId: number;
  roomName: string;
  coupons: PurchaseCoupons[];
};
export type PurchaseData = {
  batchValue: number;
  totalPoints: number;
  rooms: PurchaseRoom[];
};
