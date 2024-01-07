import { Response } from '@/types/api';
import { instance } from '..';
import { revenueData, staticsData } from './type';

export const COUPON_API = {
  getStatics: () =>
    instance.get<Response<staticsData>>('/api/coupons/backoffice/statistics'),
  getRevenue: () =>
    instance.get<Response<revenueData>>('/api/coupons/backoffice/revenue'),
};
