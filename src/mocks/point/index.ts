import { HttpResponse } from 'msw';
import pointSummaryData from '@assets/data/pointSummaryData.json';
import pointChageData from '@assets/data/pointChargeData.json';
export const getPointSummaryResolver = () => {
  return HttpResponse.json(pointSummaryData, { status: 200 });
};

export const postPointChargeResolver = () => {
  return HttpResponse.json(pointChageData, { status: 200 });
};
