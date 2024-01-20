import { Response } from '@/types/api';
import { instance } from '..';
import {
  RoomListResponseData,
  RoomData,
  RoomPostResponseData,
  RoomDeleteResponseData,
} from './type';

export const ROOM_API = {
  addRoom: (data: RoomData, accommodationId: string) =>
    instance.post<Response<RoomPostResponseData>>(
      `/api/rooms/${accommodationId}`,
      {
        data,
      },
    ),
  getRoomList: (accommodationId: string, pageSize: number, pageNum: number) =>
    instance.get<Response<RoomListResponseData>>(
      `/api/rooms/list/${accommodationId}?pageSize=${pageSize}&pageNum=${pageNum}`,
    ),
  deleteRoom: (roomId: number) =>
    instance.delete<Response<RoomDeleteResponseData>>(`/api/rooms/${roomId}`),
  getRoomDetail: (roomId: string) =>
    instance.get<Response<RoomDeleteResponseData>>(`/api/rooms/${roomId}`),
  //   editRoom: (params: RoomEditParams) =>
  //     instance.patch<Response<null>>('/api/rooms/{roomId}', params),
};
