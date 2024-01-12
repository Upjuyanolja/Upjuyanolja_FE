import { SetStateAction } from '@/types/setState';
import { PendingCouponDataList, SetPendingCouponDataList } from '../type';

export type CouponApplierProps = {
  allQuantityValue: string;
  setAllQuantityValue: SetStateAction<string>;
  pendingCouponData: PendingCouponDataList;
  setPendingCouponDataList: SetPendingCouponDataList;
};
