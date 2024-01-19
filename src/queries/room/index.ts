import { AxiosError, AxiosResponse } from 'axios';
import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { Response } from '@/types/api';
import {
  RoomData,
  RoomPostResponseData,
  RoomListResponseData,
} from '@api/room/type';
import { ROOM_API } from '@api/room';

export const useAddRoom = (
  accommodationId: string,
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
  >((data: RoomData) => ROOM_API.addRoom(data, accommodationId), {
    ...options,
  });
};

export const useGetRoomList = (
  accommodationId: string,
  options?: UseQueryOptions<RoomListResponseData, AxiosError>,
) => {
  return useQuery<RoomListResponseData, AxiosError>(
    ['getRoomList', accommodationId],
    async () => {
      const response = await ROOM_API.getRoomList(accommodationId);
      return response.data.data;
    },
    options,
  );
};
