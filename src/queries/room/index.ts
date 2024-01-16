import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Response } from '@/types/api';
import { RoomData, AddRoomParams } from '@api/room/type';
import { ROOM_API } from '@api/room';

export const useAddRoom = (
  params: AddRoomParams,
  options?: UseQueryOptions<
    AxiosResponse<Response<RoomData>>,
    AxiosError,
    AxiosResponse<Response<RoomData>>,
    [string, AddRoomParams]
  >,
) => {
  return useQuery<
    AxiosResponse<Response<RoomData>>,
    AxiosError,
    AxiosResponse<Response<RoomData>>,
    [string, AddRoomParams]
  >(
    ['addRoom', params],
    ({ queryKey }) => {
      const [, params] = queryKey as [string, AddRoomParams];
      return ROOM_API.addRoom(params);
    },
    options,
  );
};
