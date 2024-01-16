import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Response } from '@/types/api';
import { RoomData, AddRoomParams } from '@api/room/type';
import { ROOM_API } from '@api/room';

export const useAddRoom = (
  options?: UseQueryOptions<
    AxiosResponse<Response<RoomData>>,
    AxiosError,
    AddRoomParams
  >,
) => {
  return useQuery<AxiosResponse<Response<RoomData>>, AxiosError, AddRoomParams>(
    ['addRoom'],
    (params: AddRoomParams) => ROOM_API.addRoom(params),
    {
      ...options,
    },
  );
};
