import { Response } from '@/types/api';
import { instance } from '../';
import { PointChargeType, TossRequestType } from './type';

export const POINT_CHARGE_API = {
  postPointCharge: (tossRequest: TossRequestType) =>
    instance.post<Response<PointChargeType>>('/api/points/charges', {
      tossRequest,
    }),
};
