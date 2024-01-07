import { COUPON_API } from '@api/coupon';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Response } from '@/types/api';
import { dailyRevenue, revenueData, staticsData } from '@api/coupon/type';

export const useGetStatics = (
  options?: UseQueryOptions<
    AxiosResponse<Response<staticsData>>,
    AxiosError,
    staticsData
  >,
) => {
  return useQuery<
    AxiosResponse<Response<staticsData>>,
    AxiosError,
    staticsData
  >(['getStatics'], () => COUPON_API.getStatics(), { ...options });
};

export const useGetRevenue = (
  options?: UseQueryOptions<
    AxiosResponse<Response<revenueData>>,
    AxiosError,
    dailyRevenue[]
  >,
) => {
  return useQuery<
    AxiosResponse<Response<revenueData>>,
    AxiosError,
    dailyRevenue[]
  >(['getRevenue'], () => COUPON_API.getRevenue(), { ...options });
};
