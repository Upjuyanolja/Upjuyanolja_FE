import { HttpResponse } from 'msw';
import PointDetailData from '@assets/data/pointDetailData.json';

export const getPointDetailTotalResolver = () => {
  return HttpResponse.json(PointDetailData, { status: 200 });
};
