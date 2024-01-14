import { ROUTES } from '@/constants/routes';
import { dailyRevenue } from '@api/coupon/type';
import { useGetStatics, useGetRevenue } from '@queries/coupon';
import { useNavigate, useParams } from 'react-router-dom';

export const useMain = () => {
  const navigate = useNavigate();
  const { accommodationId } = useParams();
  const navigateCoupon = () => {
    navigate(`/${accommodationId}${ROUTES.COUPON}`);
  };

  const navigateCouponRegistration = () => {
    navigate(`/${accommodationId}${ROUTES.COUPON_REGISTRATION}`);
  };

  const handleRevenueDataFormat = (data: dailyRevenue[] | undefined) => {
    const revenueData = [];
    if (!data) return undefined;
    for (let index = 0; index < data.length; index++) {
      const dailyRevenue = data[index];
      revenueData.push({
        year: dailyRevenue.day,
        value: dailyRevenue.couponRevenue,
        type: '쿠폰 사용 매출',
      });
      revenueData.push({
        year: dailyRevenue.day,
        value: dailyRevenue.normalRevenue,
        type: '쿠폰 미사용 매출',
      });
    }
    return revenueData;
  };

  const { data: staticsData, isError: isStaticsError } = useGetStatics({
    select(data) {
      return data.data.data;
    },
    staleTime: 60 * 60 * 1000,
  });

  const { data, isError: isRevenueError } = useGetRevenue({
    select(data) {
      return data.data.data.revenue;
    },
    staleTime: 60 * 60 * 1000,
  });

  const revenueData = handleRevenueDataFormat(data);
  return {
    navigateCoupon,
    navigateCouponRegistration,
    staticsData,
    isStaticsError,
    revenueData,
    isRevenueError,
  };
};
