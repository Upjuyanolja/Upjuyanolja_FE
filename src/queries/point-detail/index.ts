import { Response } from '@/types/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { POINT_DETAIL_API } from '@api/point-detail/get-point-detail';
import {
  PointDetailDataType,
  menuStatusType,
} from '@api/point-detail/get-point-detail/type';

export const useGetPointDetail = (
  menuStatus: menuStatusType,
  page: number,
  options?: UseQueryOptions<
    AxiosResponse<Response<PointDetailDataType>>,
    AxiosError,
    PointDetailDataType
  >,
) => {
  return useQuery<
    AxiosResponse<Response<PointDetailDataType>>,
    AxiosError,
    PointDetailDataType
  >(
    ['getPointDetail'],
    () => POINT_DETAIL_API.getPointDetail(menuStatus, page),
    {
      ...options,
    },
  );
};
