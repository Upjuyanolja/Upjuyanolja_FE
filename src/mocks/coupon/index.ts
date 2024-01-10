import { HttpResponse } from 'msw';
import staticsData from '@assets/data/staticsData.json';
import revenueData from '@assets/data/revenueData.json';
import couponData from '@assets/data/couponData.json';

export const getStaticsResolver = () => {
  return HttpResponse.json(staticsData, { status: 200 });
};

export const getRevenueResolver = () => {
  return HttpResponse.json(revenueData, { status: 200 });
};

export const getCouponResolver = () => {
  return HttpResponse.json(couponData, { status: 200 });
};
