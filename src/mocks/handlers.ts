import { http } from 'msw';
import { getRevenueResolver, getStaticsResolver } from './coupon';
import { getUserInfoResolver } from './member';
import { getPointSummaryResolver } from './point';

export const handlers = [
  http.get('/api/coupons/backoffice/statistics', getStaticsResolver),
  http.get('/api/coupons/backoffice/revenue', getRevenueResolver),
  http.get('/api/member', getUserInfoResolver),
  http.get('/api/points/summary', getPointSummaryResolver),
];
