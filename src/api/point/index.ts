import { instance } from '..';
import { PointSummaryData, PointTotalData } from './type';

export const POINT_API = {
  pointSummary: (rangeDate: string) =>
    instance.get<PointSummaryData>(
      `/api/points/summary?rangeDate=${rangeDate}`,
    ),

  totalPoint: () => instance.get<PointTotalData>('/api/points/total-balance'),
};
