import { ErrorResponse } from '@/types/api';
import { POINT_API } from '@api/point';
import { PointSummaryData, PointTotalData } from '@api/point/type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useGetPointSummary = (
  rangeDate: string,
  options?: UseQueryOptions<
    AxiosResponse<PointSummaryData>,
    AxiosError<ErrorResponse>,
    PointSummaryData
  >,
) => {
  return useQuery<
    AxiosResponse<PointSummaryData>,
    AxiosError<ErrorResponse>,
    PointSummaryData
  >(['getPointSummary'], () => POINT_API.pointSummary(rangeDate), {
    ...options,
  });
};

export const useGetPointTotal = (
  options?: UseQueryOptions<
    AxiosResponse<PointTotalData>,
    AxiosError,
    PointTotalData
  >,
) => {
  return useQuery<AxiosResponse<PointTotalData>, AxiosError, PointTotalData>(
    ['getPointTotal'],
    () => POINT_API.totalPoint(),
    {
      ...options,
    },
  );
};
