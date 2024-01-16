import { POINT_CHARGE_API } from '@api/toss';
import { PointChargeType, TossRequestType } from '@api/toss/type';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Response } from '@/types/api';
import { message } from 'antd';

export const usePointCharge = (
  options?: UseMutationOptions<
    AxiosResponse<Response<PointChargeType>>,
    AxiosError,
    TossRequestType
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<Response<PointChargeType>>,
    AxiosError,
    TossRequestType
  >((data: TossRequestType) => POINT_CHARGE_API.postPointCharge(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getPointSummary']);
      message.success({
        content: '결제 취소신청이 완료되었습니다.',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        message.error({
          content: '결제 취소신청을 완료하지 못했습니다.',
        });
      }
    },
    ...options,
  });
};
