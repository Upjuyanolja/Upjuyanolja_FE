import { http } from 'msw';
import { postSignInResolver, getAccomodationsResolver } from './sign-in';
import { getRevenueResolver, getStaticsResolver } from './coupon';

export const handlers = [
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.get('/api/accommodations/backoffice', getAccomodationsResolver),

  http.get('/api/coupons/backoffice/statistics', getStaticsResolver),
  http.get('/api/coupons/backoffice/revenue', getRevenueResolver),
];
