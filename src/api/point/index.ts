import { instance } from '..';
import { pointSummaryData } from './type';

export const POINT_API = {
  getPointSummary: (rangeDate: string) =>
    instance.get<pointSummaryData>(
      `/api/points/summary?rangeDate=${rangeDate}`,
    ),
};
