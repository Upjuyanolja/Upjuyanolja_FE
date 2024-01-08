import { http } from 'msw';
import { getRevenueResolver, getStaticsResolver } from './coupon';
import { postSignInResolver, getAccomodationsResolver } from './sign-in';

export const handlers = [
  http.get('/api/coupons/backoffice/statistics', getStaticsResolver),
  http.get('/api/coupons/backoffice/revenue', getRevenueResolver),
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.get('/api/accommodations/backoffice', getAccomodationsResolver),
];
