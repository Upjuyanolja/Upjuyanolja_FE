import { POINT_CHARGE_API } from '@api/toss';
import { PointChargeType, TossRequestType } from '@api/toss/type';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Response } from '@/types/api';

export const usePointCharge = (
  options?: UseMutationOptions<
    AxiosResponse<Response<PointChargeType>>,
    AxiosError,
    TossRequestType
  >,
) => {
  return useMutation<
    AxiosResponse<Response<PointChargeType>>,
    AxiosError,
    TossRequestType
  >((data: TossRequestType) => POINT_CHARGE_API.postPointCharge(data), {
    ...options,
  });
};
