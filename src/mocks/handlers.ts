import { http } from 'msw';
import { getRevenueResolver, getStaticsResolver } from './coupon';

export const handlers = [
  http.get('/api/coupons/backoffice/statistics', getStaticsResolver),
  http.get('/api/coupons/backoffice/revenue', getRevenueResolver),
];
