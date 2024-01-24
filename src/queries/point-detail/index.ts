import { Response } from '@/types/api';
import {
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

export const useGetPointDetail = (
  menuStatus: menuStatusType,
  page: number,
  options?: UseQueryOptions<
    AxiosResponse<PointDetailDataType>,
    AxiosError,
    PointDetailDataType
  >,
) => {
  return useQuery<
    AxiosResponse<PointDetailDataType>,
    AxiosError,
    PointDetailDataType
  >(
    ['getPointDetail'],
    () => POINT_DETAIL_API.getPointDetail(menuStatus, page),
    {
      ...options,
    },
  );
};
export const useDeleteOrderCancel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (chargeId: number) => ORDER_CANCEL_API.deleteOrderCancel(chargeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getPointDetail']);
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
    },
  );

  return mutation;
};
