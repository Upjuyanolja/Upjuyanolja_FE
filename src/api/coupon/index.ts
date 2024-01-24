import { Response } from '@/types/api';
import { instance } from '..';
import {
  BuyCouponData,
  BuyCouponParams,
  CouponDeleteParams,
  CouponEditParams,
  CouponRoomList,
  PurchaseCouponParams,
  coupons,
  revenueData,
  staticsData,
} from './type';

export const COUPON_API = {
  getStatics: (accommodationId: string) =>
    instance.get<staticsData>(
      `/api/coupons/backoffice/statistics/${accommodationId}`,
    ),
  getRevenue: (accommodationId: string) =>
    instance.get<revenueData>(
      `/api/coupons/backoffice/revenue/${accommodationId}`,
    ),
  getCoupon: (accommodationId: string) =>
    instance.get<coupons>(`/api/coupons/backoffice/manage/${accommodationId}`),
  deleteCoupon: (params: CouponDeleteParams) =>
    instance.delete<null>('/api/coupons/backoffice/manage', {
      data: params,
    }),
  editCoupon: (params: CouponEditParams) =>
    instance.patch<null>('/api/coupons/backoffice/manage', params),
  getCouponRoomList: (accommodationId: string) =>
    instance.get<Response<CouponRoomList>>(
      `/api/coupons/backoffice/buy/${accommodationId}`,
    ),
  buyCoupon: (params: BuyCouponParams) =>
    instance.post<Response<BuyCouponData>>('/api/coupons/backoffice/buy', {
      params,
    }),
  purchaseAdditionalCoupon: (params: PurchaseCouponParams) =>
    instance.patch<null>('/api/coupons/backoffice/manage/buy', params),
};
