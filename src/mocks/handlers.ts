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
import { postAccommodationInfoResolver, postImageFileResolver } from './init';
import { postRefreshResolver } from './refresh';

export const handlers = [
  http.post('/api/auth/owners/signin', postSignInResolver),
  http.post('/api/auth/owners/signup', postSignUpResolver),
  http.post('/api/auth/owners/request-email', postAuthenticationResolver),
  http.get(
    '/api/auth/owners/verify?email=*&verificationCode=*',
    getVerifyResolver,
  ),
  http.post('/api/auth/refresh', postRefreshResolver),
  http.get(
    `${process.env.REACT_APP_SERVER_URL}pi/accommodations/backoffice`,
    getAccommodationsResolver,
  ),
  http.get('/api/coupons/backoffice/statistics/*', getStaticsResolver),
  http.get('/api/coupons/backoffice/revenue/*', getRevenueResolver),
  http.get('/api/coupons/backoffice/manage/*', getCouponResolver),
  http.delete('/api/coupons/backoffice/manage', deleteCouponResolver),
  http.patch('/api/coupons/backoffice/manage', editCouponResolver),

  http.get('/api/coupons/backoffice/buy/*', getCouponRoomListResolver),
  http.post('/api/coupons/backoffice/buy', buyCouponResolver),
  http.patch('/api/coupons/backoffice/manage/buy', successCouponResolver),

  http.get(
    `${process.env.REACT_APP_SERVER_URL}/api/points/summary`,
    getPointSummaryResolver,
  ),

  http.post('/api/points/charges', postPointChargeResolver),
  http.get('/api/points/total?*', getPointDetailTotalResolver),
  http.get('/api/points/usage?*', getPointDetailUsageResolver),
  http.get('/api/points/charges?*', getPointDetailChargesResolver),
  http.delete('/api/points/charges/*', deleteOrderCancelResolver),

  http.post('/api/rooms/*', postRoomResolver),

  http.post('/api/accommodations', postAccommodationInfoResolver),
  http.post('/api/accommodations/images', postImageFileResolver),
  http.get(
    '/api/rooms/list/*?pageSize={pageSize}&pageNum={pageNum}',
    getRoomListResolver,
  ),
];
