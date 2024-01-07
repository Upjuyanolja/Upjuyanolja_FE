import { HttpResponse } from 'msw';
import staticsData from '@assets/data/staticsData.json';
export const getStaticsResolver = () => {
  return HttpResponse.json(staticsData, { status: 200 });
};
