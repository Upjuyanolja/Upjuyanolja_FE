import { ROUTES } from '../routes';

export const navigationMap = {
  Home: {
    label: '홈',
    link: `/:1${ROUTES.MAIN}`,
  },
  Coupon: {
    label: '쿠폰 현황',
    link: `/1${ROUTES.COUPON}`,
  },
  CouponRegistration: {
    label: '쿠폰 발급',
    link: `/1${ROUTES.COUPON_REGISTRATION}`,
  },
  PointDetail: {
    label: '포인트 내역',
    link: `/1${ROUTES.POINT_DETAIL}`,
  },
  RoomUpdate: {
    label: '객실 관리',
    link: `/1${ROUTES.ROOM}`,
  },
  UseGuide: {
    label: '이용 가이드',
    link: `/1${ROUTES.MAIN}`,
  },
};
