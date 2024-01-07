import { http } from 'msw';
import { getStaticsResolver } from './coupon';

export const handlers = [
  http.get('/api/coupons/backoffice/statistics', getStaticsResolver),
];
