import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { POINT_DETAIL_API } from '@api/point-detail/get-point-detail';
import {
  PointDetailDataType,
  menuStatusType,
} from '@api/point-detail/get-point-detail/type';
import { ORDER_CANCEL_API } from '@api/point-detail/orderCancel';
import { message } from 'antd';
import { ErrorResponse } from '@/types/api';
import { RESPONSE_CODE } from '@/constants/api';
import { CancelType } from '@api/point-detail/orderCancel/type';

export const useGetPointDetail = (
  menuStatus: menuStatusType,
  page: number,
  options?: UseQueryOptions<
    AxiosResponse<PointDetailDataType>,
    AxiosError<ErrorResponse>,
    PointDetailDataType
  >,
) => {
  return useQuery<
    AxiosResponse<PointDetailDataType>,
    AxiosError<ErrorResponse>,
    PointDetailDataType
  >(
    ['getPointDetail'],
    () => POINT_DETAIL_API.getPointDetail(menuStatus, page),
    {
      ...options,
    },
  );
};

export const useDeleteOrderCancel = (
  options?: UseMutationOptions<
    AxiosResponse<CancelType>,
    AxiosError<ErrorResponse>,
    number
  >,
) => {
  const queryClient = useQueryClient();

  const handleErrorResponse = (errorCode: number | undefined) => {
    switch (errorCode) {
      case RESPONSE_CODE.TOSS_ERROR:
        return message.error('토스 API 요청에 실패 했습니다.');
      case RESPONSE_CODE.REFUND_FAIL:
        return message.error('포인트 환불 요청 정보가 잘못 됐습니다.');
      case RESPONSE_CODE.NOT_FOUND_POINT:
        return message.error('포인트 정보를 찾을 수 없습니다.');
      default:
        return message.error('요청에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };
  return useMutation<
    AxiosResponse<CancelType>,
    AxiosError<ErrorResponse>,
    number
  >((chargeId: number) => ORDER_CANCEL_API.deleteOrderCancel(chargeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getPointSummary']);
      queryClient.invalidateQueries(['getPointTotal']);
      queryClient.invalidateQueries(['getPointDetail']);
      message.success({
        content: '결제가 완료되었습니다.',
        duration: 2,
      });
    },
    onError: (error) => {
      const errorCode = error.response?.data.code;
      handleErrorResponse(errorCode);
    },
    ...options,
  });
};
