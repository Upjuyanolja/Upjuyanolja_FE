import { Response } from '@/types/api';
import { instance } from '..';
import { RoomListData, RoomData, AccommodationData } from './type';

export const ROOM_API = {
  addRoom: (accommodationId: AccommodationData) =>
    instance.post<Response<RoomData>>(`/api/rooms/${accommodationId}`),
  //   getRoom: (params: RoomAddParams) =>
  //     instance.get<Response<null>>('/api/rooms/list/{accommodationId}?pageSize={pageSize}&pageNum={pageNum}', {
  //       data: params,
  //     }),
  //   editRoom: (params: RoomEditParams) =>
  //     instance.patch<Response<null>>('/api/rooms/{roomId}', params),
};
