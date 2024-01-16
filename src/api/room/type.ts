export type RoomListData = {
  rooms: RoomData[];
};

export type Options = {
  airCondition: boolean;
  tv: boolean;
  internet: boolean;
};

export type Image = {
  url: string;
};

export type RoomData = {
  name: string;
  amount: number | null;
  defaultCapacity: number | null;
  maxCapacity: number | null;
  checkInTime: string;
  checkOutTime: string;
  count: number | null;
  images: Image[];
  options: Options;
};

export type AddRoomParams = {
  accommodationId: number;
};

export type AccommodationData = {
  accommodationId: string;
};
