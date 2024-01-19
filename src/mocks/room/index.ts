import { HttpResponse } from 'msw';
import roomData from '@assets/data/roomData.json';
import roomListData from '@assets/data/roomListData.json';

export const postRoomResolver = () => {
  return HttpResponse.json(roomData, { status: 200 });
};

export const getRoomListResolver = () => {
  return HttpResponse.json(roomListData, { status: 200 });
};
