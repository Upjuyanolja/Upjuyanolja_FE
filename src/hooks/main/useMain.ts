import { ROUTES } from '@/constants/routes';
import { useGetStatics } from '@queries/coupon';
import { useNavigate } from 'react-router-dom';

export const useMain = () => {
  const navigate = useNavigate();
  const navigateCoupon = () => {
    navigate(ROUTES.COUPON);
  };
  const navigateCouponRegistration = () => {
    navigate(ROUTES.COUPON_REGISTRATION);
  };
  const { data: staticsData, isError: isStaticsError } = useGetStatics({
    select(data) {
      return data.data.data;
    },
  });
  return {
    navigateCoupon,
    navigateCouponRegistration,
    staticsData,
    isStaticsError,
  };
};
