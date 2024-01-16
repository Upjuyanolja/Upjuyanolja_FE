import { Response } from '@/types/api';
import { instance } from '..';
import {
  CouponDeleteParams,
  CouponEditParams,
  CouponRoomList,
  PurchaseCouponParams,
  coupons,
  revenueData,
  staticsData,
} from './type';

export const COUPON_API = {
  getStatics: () =>
    instance.get<Response<staticsData>>('/api/coupons/backoffice/statistics'),
  getRevenue: () =>
    instance.get<Response<revenueData>>('/api/coupons/backoffice/revenue'),
  getCoupon: (accommodationId: string) =>
    instance.get<Response<coupons>>(
      `/api/coupons/backoffice/manage/${accommodationId}`,
    ),
  deleteCoupon: (params: CouponDeleteParams) =>
    instance.delete<Response<null>>('/api/coupons/backoffice/manage', {
      data: params,
    }),
  editCoupon: (params: CouponEditParams) =>
    instance.patch<Response<null>>('/api/coupons/backoffice/manage', params),
  getCouponRoomList: () =>
    instance.get<Response<CouponRoomList>>(
      '/api/coupons/backoffice/buy/accommodationId',
    ),
  purchaseAdditionalCoupon: (params: PurchaseCouponParams) =>
    instance.patch<Response<null>>(
      '/api/coupons/backoffice/manage/buy',
      params,
    ),
};
