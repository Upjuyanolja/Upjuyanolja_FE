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
    instance.put<RoomPostResponseData>(
      `/backoffice-api/accomodations/${accommodationId}/rooms`,
      data,
    ),
  getRoomList: (accommodationId: string, pageSize: number, pageNum: number) =>
    instance.get<RoomListResponseData>(
      `/backoffice-api/accomodations/${accommodationId}/rooms?pageSize=${pageSize}&pageNum=${pageNum}`,
    ),
  deleteRoom: (roomId: number, accommodationId: string) =>
    instance.delete<Response<RoomDeleteResponseData>>(
      `/backoffice-api/accomodations/${accommodationId}/rooms/${roomId}`,
    ),
  getRoomDetail: (roomId: string, accommodationId: string) =>
    instance.get<RoomDeleteResponseData>(
      `/backoffice-api/accomodations/${accommodationId}/rooms/${roomId}`,
    ),
  updateRoom: (data: RoomUpdateData, roomId: string, accommodationId: string) =>
    instance.put<Response<RoomUpdateResponseData>>(
      ` /backoffice-api/accomodations/${accommodationId}/rooms/${roomId}`,
      data,
    ),
};
