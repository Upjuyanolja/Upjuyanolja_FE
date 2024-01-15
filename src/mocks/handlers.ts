import { http } from 'msw';
import { postSignInResolver } from './sign-in';
import {
  getCouponResolver,
  getCouponRoomListResolver,
  getRevenueResolver,
  getStaticsResolver,
} from './coupon';
import { getPointSummaryResolver } from './point';
import { getAccommodationsResolver } from './accommodation';

export const handlers = [
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.get('/api/accommodations/backoffice', getAccommodationsResolver),

  http.get('/api/coupons/backoffice/statistics', getStaticsResolver),
  http.get('/api/coupons/backoffice/revenue', getRevenueResolver),
  http.get('/api/coupons/backoffice/manage', getCouponResolver),
  http.get(
    '/api/coupons/backoffice/buy/accommodationId',
    getCouponRoomListResolver,
  ),

  http.get('/api/points/summary', getPointSummaryResolver),
];
