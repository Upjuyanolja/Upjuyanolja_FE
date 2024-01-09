import { HttpResponse } from 'msw';
import pointSummaryData from '@assets/data/pointSummaryData.json';

export const getPointSummaryResolver = () => {
  return HttpResponse.json(pointSummaryData, { status: 200 });
};
