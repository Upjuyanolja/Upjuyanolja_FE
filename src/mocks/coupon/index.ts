import { HttpResponse } from 'msw';
import staticsData from '@assets/data/staticsData.json';
import revenueData from '@assets/data/revenueData.json';

export const getStaticsResolver = () => {
  return HttpResponse.json(staticsData, { status: 200 });
};

export const getRevenueResolver = () => {
  return HttpResponse.json(revenueData, { status: 200 });
};
