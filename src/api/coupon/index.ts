import { Response } from '@/types/api';
import { instance } from '..';
import {
  BuyCouponData,
  BuyCouponParams,
  CouponDeleteParams,
  CouponEditParams,
  CouponRoomList,
  coupons,
  revenueData,
  staticsData,
} from './type';

export const COUPON_API = {
  getStatics: (accommodationId: string) =>
    instance.get<Response<staticsData>>(
      `/api/coupons/backoffice/statistics/${accommodationId}`,
    ),
  getRevenue: (accommodationId: string) =>
    instance.get<Response<revenueData>>(
      `/api/coupons/backoffice/revenue/${accommodationId}`,
    ),
  getCoupon: () =>
    instance.get<Response<coupons>>('/api/coupons/backoffice/manage'),
  deleteCoupon: (params: CouponDeleteParams) =>
    instance.get<Response<null>>('/api/coupons/backoffice/manage', {
      data: params,
    }),
  editCoupon: (params: CouponEditParams) =>
    instance.patch<Response<null>>('/api/coupons/backoffice/manage', params),
  getCouponRoomList: () =>
    instance.get<Response<CouponRoomList>>(
      '/api/coupons/backoffice/buy/accommodationId',
    ),
  buyCoupon: (params: BuyCouponParams) =>
    instance.post<Response<BuyCouponData>>('/api/coupons/backoffice/buy', {
      params,
    }),
};
