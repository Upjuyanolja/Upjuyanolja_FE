import { ROUTES } from '../routes';
import { useRecoilValue } from 'recoil';
import { accommodationState } from '@stores/accommodation/atom';

export const getNavigationMap = () => {
  const selectedAccommodation = useRecoilValue(accommodationState);

  return {
    Home: {
      label: '홈',
      link: `/${selectedAccommodation}${ROUTES.MAIN}`,
      isRequiredAccommodationId: true,
    },
    Coupon: {
      label: '쿠폰 관리',
      link: `/${selectedAccommodation}${ROUTES.COUPON}`,
      isRequiredAccommodationId: true,
    },
    CouponRegistration: {
      label: '쿠폰 만들기',
      link: `/${selectedAccommodation}${ROUTES.COUPON_REGISTRATION}`,
      isRequiredAccommodationId: true,
    },
    PointDetail: {
      label: '포인트 내역',
      link: `${ROUTES.POINT_DETAIL}`,
      isRequiredAccommodationId: false,
    },
    RoomUpdate: {
      label: '객실 관리',
      link: `/${selectedAccommodation}${ROUTES.ROOM}`,
      isRequiredAccommodationId: true,
    },
    UseGuide: {
      label: '이용 가이드',
      link: `${ROUTES.USER_GUIDE}`,
      isRequiredAccommodationId: false,
    },
  };
};
