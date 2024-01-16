import { HttpResponse } from 'msw';
import pointDetailChargesData from '@assets/data/pointDetailChargesData.json';
import PointDetailData from '@assets/data/pointDetailData.json';
import pointDetailUsageData from '@assets/data/pointDetailUsageData.json';
import orderCancelData from '@assets/data/orderCancelData.json';
export const getPointDetailChargesResolver = () => {
  return HttpResponse.json(pointDetailChargesData, { status: 200 });
};
export const getPointDetailTotalResolver = () => {
  return HttpResponse.json(PointDetailData, { status: 200 });
};
export const getPointDetailUsageResolver = () => {
  return HttpResponse.json(pointDetailUsageData, { status: 200 });
};
export const deleteOrderCancelResolver = () => {
  return HttpResponse.json(orderCancelData, { status: 200 });
};
