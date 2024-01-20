import { RoomCardData } from '@api/room/type';

export type KoreanOptionNamesType = {
  [key: string]: string;
  tv: 'TV';
  airCondition: '에어컨';
  internet: '인터넷';
};

export type RoomCardProps = {
  data: RoomCardData;
  // eslint-disable-next-line no-unused-vars
  handleDeleteRoom: (roomId: number) => void;
};
