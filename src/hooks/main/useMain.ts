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

  const navigateUserGuide = () => {
    navigate(ROUTES.USER_GUIDE);
  };

  const navigateBusinessCenter = () => {
    navigate(
      'https://business.yanolja.com/web/kr/business/contentview?presentPage=1&pageRowSize=9&boardType=CONTENTS&boardGroup=Trends&searchDiv=&searchText=&boardNum=551',
    );
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

  const calculateStaleTime = () => {
    const now = new Date();
    const targetTime = new Date();
    const targetHour = 6;
    targetTime.setHours(targetHour, 0, 0, 0);
    const day = 24;
    const minute = 60;
    const millisecond = 1000;
    let remainingTime = targetTime.getTime() - now.getTime();
    if (remainingTime < 0) {
      remainingTime += day * minute * minute * millisecond;
    }
    const hours = Math.floor(remainingTime / (minute * minute * millisecond));
    return hours;
  };

  const { data: staticsData, isError: isStaticsError } = useGetStatics(
    accommodationId as string,
    {
      select(data) {
        return data.data;
      },
      staleTime: calculateStaleTime(),
    },
  );

  const { data, isError: isRevenueError } = useGetRevenue(
    accommodationId as string,
    {
      select(data) {
        return data.data;
      },
      staleTime: calculateStaleTime(),
    },
  );

  const revenueData = handleRevenueDataFormat(data?.revenue);
  return {
    navigateCoupon,
    navigateCouponRegistration,
    staticsData,
    isStaticsError,
    revenueData,
    isRevenueError,
    couponMessage: data?.couponMessage,
    navigateUserGuide,
    navigateBusinessCenter,
  };
};
