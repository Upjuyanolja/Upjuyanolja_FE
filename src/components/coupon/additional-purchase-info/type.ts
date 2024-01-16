/* eslint-disable no-unused-vars */
import { PurchaseCoupons } from '@hooks/coupon/type';

export type PurchaseInfoProps = {
  coupon: PurchaseCoupons;
  disabled: boolean;
  handleChangeNumberOfCoupons: (
    event: React.ChangeEvent<HTMLInputElement>,
    couponId: number,
    roomId: number,
  ) => void;
  roomId: number;
};
