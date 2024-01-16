import { Response } from '@/types/api';
import { instance } from '..';
import {
  RoomListData,
  RoomData,
  RoomPostResponseData,
  AccommodationData,
} from './type';
import { getCookie } from '@hooks/sign-in/useSignIn';

const accommodationId = getCookie('accommodationId');

export const ROOM_API = {
  addRoom: (data: RoomData) =>
    instance.post<Response<RoomPostResponseData>>(
      `/api/rooms/${accommodationId}`,
      {
        data,
      },
    ),
  //   getRoom: (params: RoomAddParams) =>
  //     instance.get<Response<null>>('/api/rooms/list/{accommodationId}?pageSize={pageSize}&pageNum={pageNum}', {
  //       data: params,
  //     }),
  //   editRoom: (params: RoomEditParams) =>
  //     instance.patch<Response<null>>('/api/rooms/{roomId}', params),
};
