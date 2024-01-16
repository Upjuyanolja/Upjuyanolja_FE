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

export const useGetPointDetail = (
  menuStatus: menuStatusType,
  page: number,
  options?: UseQueryOptions<
    AxiosResponse<Response<PointDetailDataType>>,
    AxiosError,
    PointDetailDataType
  >,
) => {
  return useQuery<
    AxiosResponse<Response<PointDetailDataType>>,
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
      },
    },
  );

  return mutation;
};
