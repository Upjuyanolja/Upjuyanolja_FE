import { instance } from '..';
import { PointSummaryData, PointTotalData } from './type';

export const POINT_API = {
  getPointSummary: (rangeDate: string) =>
    instance.get<PointSummaryData>(
      `/api/points/summary?rangeDate=${rangeDate}`,
    ),

  getPointTotal: () => instance.get<PointTotalData>('/api/points/total'),
};
