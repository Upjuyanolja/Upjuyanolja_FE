import { ROUTES } from '@/constants/routes';
import { getChartDate } from '@/utils/formatiing/dateFormat';
import { RevenueData } from '@api/coupon/type';
import { useGetStatics, useGetRevenue } from '@queries/coupon';
import { useEffect } from 'react';
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
    window.open(
      'https://business.yanolja.com/web/kr/business/contentview?presentPage=1&pageRowSize=9&boardType=CONTENTS&boardGroup=Trends&searchDiv=&searchText=&boardNum=551',
    );
  };

  useEffect(() => {
    staticsRemove();
    revenueRemove();
  }, [accommodationId]);

  const handleRevenueDataFormat = (data: RevenueData | undefined | '') => {
    const revenueData = [];
    const week = 7;
    if (data === undefined) return undefined;
    if (data === '') {
      for (let index = 0; index < week; index++) {
        const date = getChartDate(week - index);
        revenueData.push({
          year: date,
          value: 0,
          type: '쿠폰 사용 매출',
        });
        revenueData.push({
          year: date,
          value: 0,
          type: '쿠폰 미사용 매출',
        });
      }
      return revenueData;
    }
    const revenue = data.revenue;
    for (let index = 0; index < revenue.length; index++) {
      const dailyRevenue = revenue[index];
      revenueData.push({
        year: dailyRevenue.revenueDate,
        value: dailyRevenue.couponRevenue,
        type: '쿠폰 사용 매출',
      });
      revenueData.push({
        year: dailyRevenue.revenueDate,
        value: dailyRevenue.normalRevenue,
        type: '쿠폰 미사용 매출',
      });
    }
    return revenueData;
  };

  // const calculateStaleTime = () => {
  //   const now = new Date();
  //   const targetTime = new Date();
  //   const targetHour = 6;
  //   targetTime.setHours(targetHour, 0, 0, 0);
  //   const day = 24;
  //   const minute = 60;
  //   const millisecond = 1000;
  //   let remainingTime = targetTime.getTime() - now.getTime();
  //   if (remainingTime < 0) {
  //     remainingTime += day * minute * minute * millisecond;
  //   }
  //   const hours = Math.floor(remainingTime / (minute * minute * millisecond));
  //   return hours;
  // };

  const {
    data: staticsData,
    error: staticsError,
    isLoading: isStaticsLoading,
    remove: staticsRemove,
  } = useGetStatics(accommodationId as string, {
    select(data) {
      return data.data;
    },
    // staleTime: calculateStaleTime(),
  });

  const {
    data,
    error: revenueError,
    isLoading: isRevenueLoading,
    remove: revenueRemove,
  } = useGetRevenue(accommodationId as string, {
    select(data) {
      return data.data;
    },
    // staleTime: calculateStaleTime(),
  });

  const revenueData = handleRevenueDataFormat(data);
  return {
    navigateCoupon,
    navigateCouponRegistration,
    staticsData,
    staticsError,
    revenueData,
    revenueError,
    isStaticsLoading,
    isRevenueLoading,
    couponMessage: '이업주님. 쿠폰 발급 후 매출이 68% 늘어났어요!',
    navigateUserGuide,
    navigateBusinessCenter,
  };
};
