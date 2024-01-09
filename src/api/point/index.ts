import { Response } from '@/types/api';
import { instance } from '..';
import { pointSummaryData } from './type';

export const POINT_API = {
  getPointSummary: () =>
    instance.get<Response<pointSummaryData>>('/api/points/summary'),
};
