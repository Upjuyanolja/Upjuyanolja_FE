import { AxiosError, AxiosResponse } from 'axios';
import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { Response } from '@/types/api';
import { RoomData, RoomPostResponseData } from '@api/room/type';
import { ROOM_API } from '@api/room';

export const useAddRoom = (
  options?: UseMutationOptions<
    AxiosResponse<Response<RoomPostResponseData>>,
    AxiosError,
    RoomData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<RoomPostResponseData>>,
    AxiosError,
    RoomData
  >((data: RoomData) => ROOM_API.addRoom(data), {
    ...options,
  });
};
