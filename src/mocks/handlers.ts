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
import {
  postAuthenticationResolver,
  postSignUpResolver,
  getVerifyResolver,
} from './sign-up';
import {
  getPointDetailChargesResolver,
  getPointDetailUsageResolver,
  getPointDetailTotalResolver,
} from './point-detail';

const email = 'ivegaeul@main.com';
const verificationCode = '533978';

export const handlers = [
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.post('/api/auth/owners/signup', postSignUpResolver),
  http.post('/api/auth/owners/request-email', postAuthenticationResolver),
  http.get(
    `/api/auth/owners/verify?email=${email}&verificationCode=${verificationCode}`,
    getVerifyResolver,
  ),
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
