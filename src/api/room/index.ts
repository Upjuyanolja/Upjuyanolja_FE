import { Response } from '@/types/api';
import { instance } from '..';
import {
  RoomListResponseData,
  RoomData,
  RoomPostResponseData,
  RoomDeleteResponseData,
  RoomUpdateData,
  RoomUpdateResponseData,
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
  updateRoom: (data: RoomUpdateData, roomId: string) =>
    instance.put<Response<RoomUpdateResponseData>>(`/api/rooms/${roomId}`, {
      data,
    }),
};
