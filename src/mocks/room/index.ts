import { HttpResponse } from 'msw';
import roomData from '@assets/data/roomData.json';
import roomListData from '@assets/data/roomListData.json';
import roomDeleteData from '@assets/data/roomDeleteData.json';
import roomDetailData from '@assets/data/roomDetailData.json';

export const postRoomResolver = () => {
  return HttpResponse.json(roomData, { status: 200 });
};

export const getRoomListResolver = () => {
  return HttpResponse.json(roomListData, { status: 200 });
};

export const deleteRoomResolver = () => {
  return HttpResponse.json(roomDeleteData, { status: 200 });
};

export const getRoomDetailResolver = () => {
  return HttpResponse.json(roomDetailData, { status: 200 });
};
