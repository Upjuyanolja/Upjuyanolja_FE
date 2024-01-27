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
    instance.post<RoomPostResponseData>(
      `/backoffice-api/accommodations/${accommodationId}/rooms`,
      data,
    ),
  getRoomList: (accommodationId: string, pageSize: number, pageNum: number) =>
    instance.get<RoomListResponseData>(
      `/backoffice-api/accommodations/${accommodationId}/rooms?pageSize=${pageSize}&pageNum=${pageNum}`,
    ),
  deleteRoom: (roomId: number, accommodationId: string) =>
    instance.delete<Response<RoomDeleteResponseData>>(
      `/backoffice-api/accommodations/${accommodationId}/rooms/${roomId}`,
    ),
  getRoomDetail: (roomId: string, accommodationId: string) =>
    instance.get<RoomDeleteResponseData>(
      `/backoffice-api/accommodations/${accommodationId}/rooms/${roomId}`,
    ),
  updateRoom: (data: RoomUpdateData, roomId: string, accommodationId: string) =>
    instance.put<Response<RoomUpdateResponseData>>(
      ` /backoffice-api/accommodations/${accommodationId}/rooms/${roomId}`,
      data,
    ),
};
