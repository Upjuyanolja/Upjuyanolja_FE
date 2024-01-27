import { instance } from '../..';
import { CancelType } from './type';

export const ORDER_CANCEL_API = {
  deleteOrderCancel: (chargeId: number) =>
    instance.delete<CancelType>(`/api/points/charges/${chargeId}`),
};
