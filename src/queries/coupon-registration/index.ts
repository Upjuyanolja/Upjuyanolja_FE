import { COUPON_API } from '@api/coupon';
import { Response } from '@/types/api';
import { CouponRoomList } from '@api/coupon/type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
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
