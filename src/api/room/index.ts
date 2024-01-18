import { Response } from '@/types/api';
import { instance } from '..';
import {
  RoomListData,
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
  getRoomList: (data: RoomListData, accommodationId: string) =>
    instance.get<Response<null>>(
      `/api/rooms/list/${accommodationId}?pageSize={pageSize}&pageNum={pageNum}`,
      {
        data,
      },
    ),
  //   editRoom: (params: RoomEditParams) =>
  //     instance.patch<Response<null>>('/api/rooms/{roomId}', params),
};
