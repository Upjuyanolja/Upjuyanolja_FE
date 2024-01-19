import { RoomData } from '@api/room/type';

export type RoomCardProps = {
  data: RoomData;
};

export type KoreanOptionNamesType = {
  [key: string]: string;
  tv: 'TV';
  airCondition: '에어컨';
  internet: '인터넷';
};
