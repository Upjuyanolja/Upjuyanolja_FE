import { HttpResponse } from 'msw';
import roomData from '@assets/data/roomData.json';

export const postRoomResolver = () => {
  return HttpResponse.json(roomData, { status: 200 });
};
