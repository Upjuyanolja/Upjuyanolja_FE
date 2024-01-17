import { COUPON_API } from '@api/coupon';
import { Response } from '@/types/api';
import {
  BuyCouponData,
  BuyCouponParams,
  CouponRoomList,
} from '@api/coupon/type';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useGetCouponRoomList = (
  options?: UseQueryOptions<
    AxiosResponse<Response<CouponRoomList>>,
    AxiosError,
    CouponRoomList
  >,
) => {
  return useQuery<
    AxiosResponse<Response<CouponRoomList>>,
    AxiosError,
    CouponRoomList
  >(['getCouponRoomList'], () => COUPON_API.getCouponRoomList(), {
    ...options,
  });
};

export const useBuyCoupon = (
  options?: UseMutationOptions<
    AxiosResponse<Response<BuyCouponData>>,
    AxiosError,
    BuyCouponParams
  >,
) => {
  return useMutation<
    AxiosResponse<Response<BuyCouponData>>,
    AxiosError,
    BuyCouponParams
  >((params: BuyCouponParams) => COUPON_API.buyCoupon(params), {
    ...options,
  });
};
