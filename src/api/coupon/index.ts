import { instance } from '..';
import {
  BuyCouponData,
  BuyCouponParams,
  CouponDeleteParams,
  CouponEditParams,
  CouponRoomList,
  PurchaseCouponParams,
  Coupons,
  RevenueData,
  StaticsData,
} from './type';

export const COUPON_API = {
  getStatics: (accommodationId: string) =>
    instance.get<StaticsData | ''>(
      `/api/coupons/backoffice/statistics/${accommodationId}`,
    ),
  getRevenue: (accommodationId: string) =>
    instance.get<RevenueData | ''>(
      `/api/coupons/backoffice/revenue/${accommodationId}`,
    ),
  getCoupon: (accommodationId: string) =>
    instance.get<Coupons>(`/api/coupons/backoffice/manage/${accommodationId}`),
  deleteCoupon: (params: CouponDeleteParams) =>
    instance.delete<''>('/api/coupons/backoffice/manage', {
      data: params,
    }),
  editCoupon: (params: CouponEditParams) =>
    instance.patch<''>('/api/coupons/backoffice/manage', params),
  getCouponRoomList: (accommodationId: string) =>
    instance.get<CouponRoomList>(
      `/api/coupons/backoffice/buy/${accommodationId}`,
    ),
  buyCoupon: (params: BuyCouponParams) =>
    instance.post<BuyCouponData>('/api/coupons/backoffice/buy', params),
  purchaseAdditionalCoupon: (params: PurchaseCouponParams) =>
    instance.patch<''>('/api/coupons/backoffice/manage/buy', params),
};
