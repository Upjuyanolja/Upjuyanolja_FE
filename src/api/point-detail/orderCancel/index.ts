import { Response } from '@/types/api';
import { instance } from '../..';
import { CancelType } from './type';

export const ORDER_CANCEL_API = {
  deleteOrderCancel: (chargeId: number) =>
    // API가 실제로 나올경우 API URL  부분 수정.

    instance.delete<Response<CancelType>>(
      `/api/points/charges/${chargeId && 1}`,
    ),
};
