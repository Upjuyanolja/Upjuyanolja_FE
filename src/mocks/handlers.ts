import { http } from 'msw';
import { postSignInResolver, getAccomodationsResolver } from './sign-in';
import { getRevenueResolver, getStaticsResolver } from './coupon';
import { getUserInfoResolver } from './member';
import { getPointSummaryResolver } from './point';
import { getAccommodationListResolver } from './accommodation';

export const handlers = [
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.get('/api/accommodations/backoffice', getAccomodationsResolver),

  http.get('/api/coupons/backoffice/statistics', getStaticsResolver),
  http.get('/api/coupons/backoffice/revenue', getRevenueResolver),
  http.get('/api/member', getUserInfoResolver),
  http.get('/api/points/summary', getPointSummaryResolver),
  http.get('/api/accommodations/backoffice', getAccommodationListResolver),
];
