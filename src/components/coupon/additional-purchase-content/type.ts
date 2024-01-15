/* eslint-disable no-unused-vars */
import { PurchaseData } from '@hooks/coupon/type';

export type PurchaseContentProps = {
  purchaseData: PurchaseData | undefined;
  handleBatchEditCheckbox: VoidFunction;
  handleChangeBatchValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
