import { instance } from '../..';
import { PointDetailDataType, MenuStatusType } from './type';

export const POINT_DETAIL_API = {
  getPointDetail: (menuStatus: MenuStatusType, page: number) =>
    instance.get<PointDetailDataType>(
      `/api/points/${menuStatus}?page=${page - 1}`,
    ),
};
