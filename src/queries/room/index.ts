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
  RoomDeleteResponseData,
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

// export const useAddImageFile =

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

export const useDeleteRoom = (
  roomId: number,
  options?: UseMutationOptions<
    AxiosResponse<Response<RoomDeleteResponseData>>,
    AxiosError,
    number
  >,
) => {
  return useMutation<
    AxiosResponse<Response<RoomDeleteResponseData>>,
    AxiosError,
    number
  >((roomId) => ROOM_API.deleteRoom(roomId), {
    ...options,
  });
};

export const useGetRoomDetail = (
  roomId: string,
  options?: UseQueryOptions<RoomDeleteResponseData, AxiosError>,
) => {
  return useQuery<RoomDeleteResponseData, AxiosError>(
    ['getRoomDetail', roomId],
    async () => {
      const response = await ROOM_API.getRoomDetail(roomId);
      return response.data.data;
    },
    options,
  );
};
