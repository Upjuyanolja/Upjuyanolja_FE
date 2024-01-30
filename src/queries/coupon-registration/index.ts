import { COUPON_API } from '@api/coupon';
import { ErrorResponse } from '@/types/api';
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
  accommodationId: string,
  options?: UseQueryOptions<
    AxiosResponse<CouponRoomList>,
    AxiosError,
    CouponRoomList
  >,
) => {
  return useQuery<AxiosResponse<CouponRoomList>, AxiosError, CouponRoomList>(
    ['getCouponRoomList'],
    () => COUPON_API.couponRoomList(accommodationId),
    {
      ...options,
    },
  );
};

export const useBuyCoupon = (
  options?: UseMutationOptions<
    AxiosResponse<BuyCouponData>,
    AxiosError<ErrorResponse>,
    BuyCouponParams
  >,
) => {
  return useMutation<
    AxiosResponse<BuyCouponData>,
    AxiosError<ErrorResponse>,
    BuyCouponParams
  >((params: BuyCouponParams) => COUPON_API.buyCoupon(params), {
    ...options,
  });
};
