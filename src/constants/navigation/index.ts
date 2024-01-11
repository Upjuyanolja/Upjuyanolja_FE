import { ROUTES } from '../routes';

export const navigationMap = {
  Home: {
    label: '홈',
    link: ROUTES.MAIN,
  },
  Coupon: {
    label: '쿠폰 현황',
    link: ROUTES.COUPON,
  },
  CouponRegistration: {
    label: '쿠폰 발급',
    link: ROUTES.COUPON_REGISTRATION,
  },
  PointDetail: {
    label: '포인트 내역',
    link: ROUTES.POINT_DETAIL,
  },
  RoomUpdate: {
    label: '객실 관리',
    link: ROUTES.ROOM,
  },
  UseGuide: {
    label: '이용 가이드',
    link: ROUTES.MAIN,
  },
};
