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
  revenueData,
  staticsData,
} from '@api/coupon/type';

export const useGetStatics = (
  accommodationId: string,
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
  >(['getStatics'], () => COUPON_API.getStatics(accommodationId), {
    ...options,
  });
};

export const useGetRevenue = (
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<Response<revenueData>>,
    AxiosError,
    revenueData
  >,
) => {
  return useQuery<
    AxiosResponse<Response<revenueData>>,
    AxiosError,
    revenueData
  >(['getRevenue'], () => COUPON_API.getRevenue(accommodationId), {
    ...options,
  });
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
