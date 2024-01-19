import { http } from 'msw';
import { postSignInResolver } from './sign-in';
import {
  deleteCouponResolver,
  editCouponResolver,
  getCouponResolver,
  getRevenueResolver,
  getStaticsResolver,
  successCouponResolver,
} from './coupon';
import { getPointSummaryResolver, postPointChargeResolver } from './point';
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
import {
  buyCouponResolver,
  getCouponRoomListResolver,
} from './coupon-registration';
import { postRoomResolver, getRoomListResolver } from './room';

const email = 'ivegaeul@naver.com';
const verificationCode = '020924';
const accommodationId = 1;
export const handlers = [
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.post('/api/auth/owners/signup', postSignUpResolver),
  http.post('/api/auth/owners/request-email', postAuthenticationResolver),
  http.get(
    `/api/auth/owners/verify?email=${email}&verificationCode=${verificationCode}`,
    getVerifyResolver,
  ),
  http.get('/api/accommodations/backoffice', getAccommodationsResolver),
  http.get(
    `/api/coupons/backoffice/statistics/${accommodationId}`,
    getStaticsResolver,
  ),
  http.get(
    `/api/coupons/backoffice/revenue/${accommodationId}`,
    getRevenueResolver,
  ),
  http.get(
    `/api/coupons/backoffice/manage/${accommodationId}`,
    getCouponResolver,
  ),
  http.delete('/api/coupons/backoffice/manage', deleteCouponResolver),
  http.patch('/api/coupons/backoffice/manage', editCouponResolver),

  http.get(
    `/api/coupons/backoffice/buy/${accommodationId}`,
    getCouponRoomListResolver,
  ),
  http.post('/api/coupons/backoffice/buy', buyCouponResolver),
  http.patch('/api/coupons/backoffice/manage/buy', successCouponResolver),

  http.get('/api/points/summary', getPointSummaryResolver),

  http.post('/api/points/charges', postPointChargeResolver),
  http.get('/api/points/total?1', getPointDetailTotalResolver),
  http.get('/api/points/usage?1', getPointDetailUsageResolver),
  http.get('/api/points/charges?1', getPointDetailChargesResolver),
  http.delete('/api/points/charges/1', deleteOrderCancelResolver),

  http.post(`/api/rooms/${accommodationId}`, postRoomResolver),
  http.get(
    `/api/rooms/list/${accommodationId}?pageSize={pageSize}&pageNum={pageNum}`,
    getRoomListResolver,
  ),
];
