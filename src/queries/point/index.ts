import { ErrorResponse } from '@/types/api';
import { POINT_API } from '@api/point';
import { pointSummaryData } from '@api/point/type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useGetPointSummary = (
  rangeDate: string,
  options?: UseQueryOptions<
    AxiosResponse<pointSummaryData>,
    AxiosError<ErrorResponse>,
    pointSummaryData
  >,
) => {
  return useQuery<
    AxiosResponse<pointSummaryData>,
    AxiosError<ErrorResponse>,
    pointSummaryData
  >(['getPointSummary'], () => POINT_API.getPointSummary(rangeDate), {
    ...options,
  });
};
