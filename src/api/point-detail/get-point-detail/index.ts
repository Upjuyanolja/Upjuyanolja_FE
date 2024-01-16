import { Response } from '@/types/api';
import { instance } from '../..';
import { PointDetailDataType, menuStatusType } from './type';

export const POINT_DETAIL_API = {
  getPointDetail: (menuStatus: menuStatusType, page: number) =>
    instance.get<Response<PointDetailDataType>>(
      `/api/points/${menuStatus}?${page}`,
    ),
};
