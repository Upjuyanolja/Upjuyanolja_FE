import { http } from 'msw';
import { postSignInResolver } from './sign-in';
import {
  deleteCouponResolver,
  editCouponResolver,
  getCouponResolver,
  getRevenueResolver,
  getStaticsResolver,
} from './coupon';
import { getUserInfoResolver } from './member';
import { getPointSummaryResolver } from './point';
import { getAccommodationsResolver } from './accommodation';
import {
  getPointDetailTotalResolver,
  deleteOrderCancelResolver,
  getPointDetailUsageResolver,
  getPointDetailChargesResolver,
} from './point-detail';
import {
  postSignUpResolver,
  postAuthenticationResolver,
  getVerifyResolver,
} from './sign-up';

const email = 'ivegaeul@naver.com';
const verificationCode = '020924';
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
  http.delete('/api/coupons/backoffice/manage', deleteCouponResolver),
  http.patch('/api/coupons/backoffice/manage', editCouponResolver),

  http.get('/api/member', getUserInfoResolver),
  http.get('/api/points/summary', getPointSummaryResolver),

  http.get('/api/points/total?1', getPointDetailTotalResolver),
  http.get('/api/points/usage?1', getPointDetailUsageResolver),
  http.get('/api/points/charges?1', getPointDetailChargesResolver),
  http.delete('/api/points/charges/1', deleteOrderCancelResolver),
];
