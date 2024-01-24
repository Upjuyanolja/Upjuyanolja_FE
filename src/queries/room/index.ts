import { AxiosError, AxiosResponse } from 'axios';
import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { Response } from '@/types/api';
import {
  RoomData,
  RoomPostResponseData,
  RoomListResponseData,
  RoomDeleteResponseData,
  RoomUpdateData,
  RoomUpdateResponseData,
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

export const useGetInfiniteRoomList = (
  accommodationId: string,
  options?: UseInfiniteQueryOptions<
    AxiosResponse<RoomListResponseData>,
    AxiosError,
    RoomListResponseData
  >,
) => {
  return useInfiniteQuery<
    AxiosResponse<RoomListResponseData>,
    AxiosError,
    RoomListResponseData
  >(
    ['room-list'],
    ({ pageParam = 0 }) => ROOM_API.getRoomList(accommodationId, 8, pageParam),
    {
      getNextPageParam: ({ data: { pageNum, totalPages } }) => {
        const nextPage = pageNum + 1;
        return totalPages > pageNum ? nextPage : undefined;
      },
      ...options,
    },
  );
};

export const useDeleteRoom = (
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
  options?: UseQueryOptions<
    AxiosResponse<RoomDeleteResponseData>,
    AxiosError,
    RoomDeleteResponseData
  >,
) => {
  return useQuery<
    AxiosResponse<RoomDeleteResponseData>,
    AxiosError,
    RoomDeleteResponseData
  >(['getRoomDetail'], () => ROOM_API.getRoomDetail(roomId), { ...options });
};

export const useUpdateRoom = (
  roomId: string,
  options?: UseMutationOptions<
    AxiosResponse<Response<RoomUpdateResponseData>>,
    AxiosError,
    RoomUpdateData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<RoomUpdateResponseData>>,
    AxiosError,
    RoomUpdateData
  >((data: RoomUpdateData) => ROOM_API.updateRoom(data, roomId), {
    ...options,
  });
};
