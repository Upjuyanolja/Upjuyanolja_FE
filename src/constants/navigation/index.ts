import { getCookie } from '@hooks/sign-in/useSignIn';
import { ROUTES } from '../routes';

export const getNavigationMap = () => {
  const accommodationId = getCookie('accommodationId') || 0;

  return {
    Home: {
      label: '홈',
      link: `/${accommodationId}${ROUTES.MAIN}`,
      isRequiredAccommodationId: true,
    },
    Coupon: {
      label: '쿠폰 관리',
      link: `/${accommodationId}${ROUTES.COUPON}`,
      isRequiredAccommodationId: true,
    },
    CouponRegistration: {
      label: '쿠폰 만들기',
      link: `/${accommodationId}${ROUTES.COUPON_REGISTRATION}`,
      isRequiredAccommodationId: true,
    },
    PointDetail: {
      label: '포인트 내역',
      link: `${ROUTES.POINT_DETAIL}`,
      isRequiredAccommodationId: false,
    },
    RoomUpdate: {
      label: '객실 관리',
      link: `/${accommodationId}${ROUTES.ROOM}`,
      isRequiredAccommodationId: true,
    },
    UseGuide: {
      label: '이용 가이드',
      link: `${ROUTES.USER_GUIDE}`,
      isRequiredAccommodationId: false,
    },
  };
};
