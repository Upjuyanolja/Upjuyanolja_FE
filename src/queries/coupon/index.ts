import { COUPON_API } from '@api/coupon';
import { AxiosError, AxiosResponse } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { Response } from '@/types/api';
import {
  CouponDeleteParams,
  CouponEditParams,
  coupons,
  dailyRevenue,
  revenueData,
  staticsData,
} from '@api/coupon/type';

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

export const useGetCoupon = (
  options?: UseQueryOptions<
    AxiosResponse<Response<coupons>>,
    AxiosError,
    coupons
  >,
) => {
  return useQuery<AxiosResponse<Response<coupons>>, AxiosError, coupons>(
    ['getCoupon'],
    () => COUPON_API.getCoupon(),
    { ...options },
  );
};

export const useDeleteCoupon = (
  options?: UseMutationOptions<
    AxiosResponse<Response<null>>,
    AxiosError,
    CouponDeleteParams
  >,
) => {
  return useMutation<
    AxiosResponse<Response<null>>,
    AxiosError,
    CouponDeleteParams
  >((params: CouponDeleteParams) => COUPON_API.deleteCoupon(params), {
    ...options,
  });
};

export const useEditCoupon = (
  options?: UseMutationOptions<
    AxiosResponse<Response<null>>,
    AxiosError,
    CouponEditParams
  >,
) => {
  return useMutation<
    AxiosResponse<Response<null>>,
    AxiosError,
    CouponEditParams
  >((params: CouponEditParams) => COUPON_API.editCoupon(params), {
    ...options,
  });
};
