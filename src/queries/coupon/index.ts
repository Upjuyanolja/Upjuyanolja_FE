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
    AxiosResponse<staticsData | null>,
    AxiosError<ErrorResponse>,
    staticsData | null
  >,
) => {
  return useQuery<
    AxiosResponse<staticsData | null>,
    AxiosError<ErrorResponse>,
    staticsData | null
  >(['getStatics'], () => COUPON_API.getStatics(accommodationId), {
    ...options,
  });
};

export const useGetRevenue = (
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<revenueData>,
    AxiosError<ErrorResponse>,
    revenueData
  >,
) => {
  return useQuery<
    AxiosResponse<revenueData>,
    AxiosError<ErrorResponse>,
    revenueData
  >(['getRevenue'], () => COUPON_API.getRevenue(accommodationId), {
    ...options,
  });
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
    AxiosResponse<''>,
    AxiosError,
    CouponDeleteParams
  >,
) =>
  useMutation<AxiosResponse<''>, AxiosError, CouponDeleteParams>(
    (params: CouponDeleteParams) => COUPON_API.deleteCoupon(params),
    {
      ...options,
    },
  );

export const useEditCoupon = (
  options?: UseMutationOptions<AxiosResponse<''>, AxiosError, CouponEditParams>,
) =>
  useMutation<AxiosResponse<''>, AxiosError, CouponEditParams>(
    (params: CouponEditParams) => COUPON_API.editCoupon(params),
    {
      ...options,
    },
  );

export const usePurchaseAdditionalCoupon = (
  options?: UseMutationOptions<
    AxiosResponse<''>,
    AxiosError<ErrorResponse>,
    PurchaseCouponParams
  >,
) =>
  useMutation<
    AxiosResponse<''>,
    AxiosError<ErrorResponse>,
    PurchaseCouponParams
  >(
    (params: PurchaseCouponParams) =>
      COUPON_API.purchaseAdditionalCoupon(params),
    {
      ...options,
    },
  );
