import { RoomCardData } from '@api/room/type';

export type KoreanOptionNamesType = {
  [key: string]: string;
  tv: 'TV';
  airCondition: '에어컨';
  internet: '인터넷';
};

export type RoomCardProps = {
  data: RoomCardData;
  handleDeleteRoom: (roomId: number) => void;
};
