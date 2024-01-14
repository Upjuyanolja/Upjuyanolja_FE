import { Response } from '@/types/api';
import { instance } from '..';
import {
  CouponDeleteParams,
  CouponEditParams,
  coupons,
  revenueData,
  staticsData,
} from './type';

export const COUPON_API = {
  getStatics: () =>
    instance.get<Response<staticsData>>('/api/coupons/backoffice/statistics'),
  getRevenue: () =>
    instance.get<Response<revenueData>>('/api/coupons/backoffice/revenue'),
  getCoupon: () =>
    instance.get<Response<coupons>>('/api/coupons/backoffice/manage'),
  deleteCoupon: (params: CouponDeleteParams) =>
    instance.get<Response<null>>('/api/coupons/backoffice/manage', {
      data: params,
    }),
  editCoupon: (params: CouponEditParams) =>
    instance.patch<Response<null>>('/api/coupons/backoffice/manage', params),
};
