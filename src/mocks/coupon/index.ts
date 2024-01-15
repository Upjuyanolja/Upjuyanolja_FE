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

export const deleteCouponResolver = () => {
  return HttpResponse.json(
    {
      message: '성공적으로 쿠폰이 삭제되었습니다.',
      data: null,
    },
    { status: 200 },
  );
};

export const editCouponResolver = () => {
  return HttpResponse.json(
    {
      message: '성공적으로 쿠폰이 수정되었습니다.',
      data: null,
    },
    { status: 200 },
  );
};
