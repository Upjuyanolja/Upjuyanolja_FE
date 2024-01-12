import { http } from 'msw';
import { postSignInResolver } from './sign-in';
import {
  getCouponResolver,
  getRevenueResolver,
  getStaticsResolver,
} from './coupon';
import { getUserInfoResolver } from './member';
import { getPointSummaryResolver } from './point';
import { getAccommodationsResolver } from './accommodation';
import { getPointDetailTotalResolver } from './point-detail/total';
import { getPointDetailUsageResolver } from './point-detail/usage';
import { getPointDetailChargesResolver } from './point-detail/charges';

export const handlers = [
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.get('/api/accommodations/backoffice', getAccommodationsResolver),

  http.get('/api/coupons/backoffice/statistics', getStaticsResolver),
  http.get('/api/coupons/backoffice/revenue', getRevenueResolver),
  http.get('/api/coupons/backoffice/manage', getCouponResolver),

  http.get('/api/member', getUserInfoResolver),
  http.get('/api/points/summary', getPointSummaryResolver),

  http.get('/api/points/total/1', getPointDetailTotalResolver),
  http.get('/api/points/usage/1', getPointDetailUsageResolver),
  http.get('/api/points/charges/1', getPointDetailChargesResolver),
];
