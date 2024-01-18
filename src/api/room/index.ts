import { Response } from '@/types/api';
import { instance } from '..';
import {
  RoomListResponseData,
  RoomData,
  RoomPostResponseData,
  AccommodationData,
} from './type';

export const ROOM_API = {
  addRoom: (data: RoomData, accommodationId: string) =>
    instance.post<Response<RoomPostResponseData>>(
      `/api/rooms/${accommodationId}`,
      {
        data,
      },
    ),
  getRoomList: (accommodationId: string) =>
    instance.get<Response<RoomListResponseData>>(
      `/api/rooms/list/${accommodationId}?pageSize={pageSize}&pageNum={pageNum}`,
    ),
  //   editRoom: (params: RoomEditParams) =>
  //     instance.patch<Response<null>>('/api/rooms/{roomId}', params),
};
