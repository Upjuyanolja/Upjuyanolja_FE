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
  statics: (accommodationId: string) =>
    instance.get<StaticsData | ''>(
      `/api/coupons/backoffice/statistics/${accommodationId}`,
    ),
  revenue: (accommodationId: string) =>
    instance.get<RevenueData | ''>(
      `/api/coupons/backoffice/revenue/${accommodationId}`,
    ),
  coupon: (accommodationId: string) =>
    instance.get<Coupons>(`/api/coupons/backoffice/manage/${accommodationId}`),
  deleteCoupon: (params: CouponDeleteParams) =>
    instance.delete<''>('/api/coupons/backoffice/manage', {
      data: params,
    }),
  editCoupon: (params: CouponEditParams) =>
    instance.patch<''>('/api/coupons/backoffice/manage', params),
  couponRoomList: (accommodationId: string) =>
    instance.get<CouponRoomList>(
      `/api/coupons/backoffice/buy/${accommodationId}`,
    ),
  buyCoupon: (params: BuyCouponParams) =>
    instance.post<BuyCouponData>('/api/coupons/backoffice/buy', params),
  purchaseAdditionalCoupon: (params: PurchaseCouponParams) =>
    instance.patch<''>('/api/coupons/backoffice/manage/buy', params),
};
