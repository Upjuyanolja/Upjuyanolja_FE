import { POINT_CHARGE_API } from '@api/toss';
import { PointChargeType, TossRequestType } from '@api/toss/type';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '@/types/api';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { currentUrlState } from '@stores/point-charge-modal';
import { useRecoilValue } from 'recoil';
import { RESPONSE_CODE } from '@/constants/api';

export const usePointCharge = (
  options?: UseMutationOptions<
    AxiosResponse<PointChargeType>,
    AxiosError,
    TossRequestType
  >,
) => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const currentUrl = useRecoilValue(currentUrlState);

  const handleErrorResponse = (errorCode: number | undefined) => {
    switch (errorCode) {
      case RESPONSE_CODE.TOSS_ERROR:
        return message.error('토스 API 요청에 실패 했습니다.');
      case RESPONSE_CODE.POINT_PAYMENT_FAIL:
        return navigation('결제 승인에 실패 했습니다.');
      default:
        return message.error('요청에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };
  return useMutation<
    AxiosResponse<PointChargeType>,
    AxiosError<ErrorResponse>,
    TossRequestType
  >((data: TossRequestType) => POINT_CHARGE_API.postPointCharge(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getPointSummary']);

      queryClient.invalidateQueries(['getPointTotal']);
      message.success({
        content: '결제가 완료되었습니다.',
        duration: 2,
      });

      navigation(currentUrl);
    },
    onError: (error) => {
      const errorCode = error.response?.data.code;

      handleErrorResponse(errorCode);

      navigation(currentUrl);
    },
    ...options,
  });
};
