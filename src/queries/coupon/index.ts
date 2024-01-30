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
  Coupons,
  RevenueData,
  StaticsData,
} from '@api/coupon/type';

export const useGetStatics = (
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<StaticsData | ''>,
    AxiosError<ErrorResponse>,
    StaticsData | ''
  >,
) => {
  return useQuery<
    AxiosResponse<StaticsData | ''>,
    AxiosError<ErrorResponse>,
    StaticsData | ''
  >(['getStatics'], () => COUPON_API.statics(accommodationId), {
    ...options,
  });
};

export const useGetRevenue = (
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<RevenueData | ''>,
    AxiosError<ErrorResponse>,
    RevenueData | ''
  >,
) => {
  return useQuery<
    AxiosResponse<RevenueData | ''>,
    AxiosError<ErrorResponse>,
    RevenueData | ''
  >(['getRevenue'], () => COUPON_API.revenue(accommodationId), {
    ...options,
  });
};

export const useGetCoupon = (
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<Coupons>,
    AxiosError<ErrorResponse>,
    Coupons
  >,
) =>
  useQuery<AxiosResponse<Coupons>, AxiosError<ErrorResponse>, Coupons>(
    ['getCoupon'],
    () => COUPON_API.coupon(accommodationId),
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
