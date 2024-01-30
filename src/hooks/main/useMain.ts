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

  const {
    data: staticsData,
    error: staticsError,
    isLoading: isStaticsLoading,
    remove: staticsRemove,
  } = useGetStatics(accommodationId as string, {
    select(data) {
      return data.data;
    },
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
    couponMessage: data ? data.couponMessage : '',
    navigateUserGuide,
    navigateBusinessCenter,
  };
};
