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
import { useNavigate } from 'react-router-dom';

export const usePointCharge = (
  options?: UseMutationOptions<
    AxiosResponse<Response<PointChargeType>>,
    AxiosError,
    TossRequestType
  >,
) => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  return useMutation<
    AxiosResponse<Response<PointChargeType>>,
    AxiosError,
    TossRequestType
  >((data: TossRequestType) => POINT_CHARGE_API.postPointCharge(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getPointSummary']);
      message.success({
        content: '결제가 완료되었습니다.',
        duration: 2,
      });
      navigation('/1/main');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        message.error({
          content: '결제를 완료하지 못했습니다.',
        });
      }
      navigation('/1/main');
    },
    ...options,
  });
};
