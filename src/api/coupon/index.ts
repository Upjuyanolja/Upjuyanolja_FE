import { Response } from '@/types/api';
import { instance } from '..';
import { staticsData } from './type';

export const COUPON_API = {
  getStatics: () =>
    instance.get<Response<staticsData>>('/api/coupons/backoffice/statistics'),
};
