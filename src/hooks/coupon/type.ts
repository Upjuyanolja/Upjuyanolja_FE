import { Coupon } from '@api/coupon/type';
import { tableData } from '@components/coupon/table/type';

export type CouponData = {
  expiry: string;
  coupons: tableData[];
};

export type PurchaseCoupons = Omit<Coupon, 'appliedPrice' | 'quantity'> & {
  buyQuantity: number;
  eachPoint: number;
  points: number;
};

export type PurchaseRoom = {
  roomId: number;
  roomName: string;
  coupons: PurchaseCoupons[];
};
export type PurchaseData = {
  isAppliedBatchEdit: boolean;
  batchValue: number;
  totalPoints: number;
  rooms: PurchaseRoom[];
};
