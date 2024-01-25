import { instance } from '..';
import { pointSummaryData } from './type';

export const POINT_API = {
  getPointSummary: () => instance.get<pointSummaryData>('/api/points/summary'),
};
