import { COUPON_API } from '@api/coupon';
import { AxiosError, AxiosResponse } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { ErrorResponse } from '@/types/api';
import {
  CouponDeleteParams,
  CouponEditParams,
  PurchaseCouponParams,
  coupons,
  revenueData,
  staticsData,
} from '@api/coupon/type';

export const useGetStatics = (
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<staticsData>,
    AxiosError,
    staticsData
  >,
) => {
  return useQuery<AxiosResponse<staticsData>, AxiosError, staticsData>(
    ['getStatics'],
    () => COUPON_API.getStatics(accommodationId),
    {
      ...options,
    },
  );
};

export const useGetRevenue = (
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<revenueData>,
    AxiosError,
    revenueData
  >,
) => {
  return useQuery<AxiosResponse<revenueData>, AxiosError, revenueData>(
    ['getRevenue'],
    () => COUPON_API.getRevenue(accommodationId),
    {
      ...options,
    },
  );
};

export const useGetCoupon = (
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<coupons>,
    AxiosError<ErrorResponse>,
    coupons
  >,
) =>
  useQuery<AxiosResponse<coupons>, AxiosError<ErrorResponse>, coupons>(
    ['getCoupon'],
    () => COUPON_API.getCoupon(accommodationId),
    { ...options },
  );

export const useDeleteCoupon = (
  options?: UseMutationOptions<
    AxiosResponse<null>,
    AxiosError,
    CouponDeleteParams
  >,
) =>
  useMutation<AxiosResponse<null>, AxiosError, CouponDeleteParams>(
    (params: CouponDeleteParams) => COUPON_API.deleteCoupon(params),
    {
      ...options,
    },
  );

export const useEditCoupon = (
  options?: UseMutationOptions<
    AxiosResponse<null>,
    AxiosError,
    CouponEditParams
  >,
) =>
  useMutation<AxiosResponse<null>, AxiosError, CouponEditParams>(
    (params: CouponEditParams) => COUPON_API.editCoupon(params),
    {
      ...options,
    },
  );

export const usePurchaseAdditionalCoupon = (
  options?: UseMutationOptions<
    AxiosResponse<null>,
    AxiosError<ErrorResponse>,
    PurchaseCouponParams
  >,
) =>
  useMutation<
    AxiosResponse<null>,
    AxiosError<ErrorResponse>,
    PurchaseCouponParams
  >(
    (params: PurchaseCouponParams) =>
      COUPON_API.purchaseAdditionalCoupon(params),
    {
      ...options,
    },
  );
