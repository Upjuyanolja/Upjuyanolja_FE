import { POINT_API } from '@api/point';
import { pointSummaryData } from '@api/point/type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useGetPointSummary = (
  options?: UseQueryOptions<
    AxiosResponse<pointSummaryData>,
    AxiosError,
    pointSummaryData
  >,
) => {
  return useQuery<
    AxiosResponse<pointSummaryData>,
    AxiosError,
    pointSummaryData
  >(['getPointSummary'], () => POINT_API.getPointSummary(), { ...options });
};
