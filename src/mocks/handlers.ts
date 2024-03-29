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
import {
  postRoomResolver,
  getRoomListResolver,
  deleteRoomResolver,
  getRoomDetailResolver,
  updateRoomResolver,
} from './room';
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
    `${process.env.REACT_APP_SERVER_URL}/api/accommodations/backoffice`,
    getAccommodationsResolver,
  ),
  http.get(
    `${process.env.REACT_APP_SERVER_URL}/api/coupons/backoffice/statistics/*`,
    getStaticsResolver,
  ),
  http.get(
    `${process.env.REACT_APP_SERVER_URL}/api/coupons/backoffice/revenue/*`,
    getRevenueResolver,
  ),
  http.get(
    `${process.env.REACT_APP_SERVER_URL}/api/coupons/backoffice/manage/*`,
    getCouponResolver,
  ),
  http.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/coupons/backoffice/manage`,
    deleteCouponResolver,
  ),
  http.patch(
    `${process.env.REACT_APP_SERVER_URL}/api/coupons/backoffice/manage`,
    editCouponResolver,
  ),

  http.get(
    `${process.env.REACT_APP_SERVER_URL}/api/coupons/backoffice/buy/*`,
    getCouponRoomListResolver,
  ),
  http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/coupons/backoffice/buy`,
    buyCouponResolver,
  ),
  http.patch(
    `${process.env.REACT_APP_SERVER_URL}/api/coupons/backoffice/manage/buy`,
    successCouponResolver,
  ),

  // http.get('/api/points/summary', getPointSummaryResolver) 서버 연결 완.,

  http.post('/api/points/charges', postPointChargeResolver),
  http.get(
    `${process.env.REACT_APP_SERVER_URL}/api/points/total?*`,
    getPointDetailTotalResolver,
  ),
  http.get('/api/points/usage?*', getPointDetailUsageResolver),
  http.get('/api/points/charges?*', getPointDetailChargesResolver),
  http.delete('/api/points/charges/*', deleteOrderCancelResolver),

  http.post('/api/rooms/*', postRoomResolver),

  http.post('/backoffice-api/accommodations', postAccommodationInfoResolver),
  http.post('/backoffice-api/images', postImageFileResolver),
  http.get('/api/rooms/list/*', getRoomListResolver),
  http.delete('/api/rooms/*', deleteRoomResolver),
  http.get('/api/rooms/*', getRoomDetailResolver),
  http.put('/api/rooms/*', updateRoomResolver),
];
