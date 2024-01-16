export type RoomListData = {
  rooms: RoomData[];
};

export type Options = {
  airCondition: boolean;
  tv: boolean;
  internet: boolean;
};

export type Image = {
  id?: number;
  url: string;
};

export type RoomData = {
  name: string;
  price: number | null;
  defaultCapacity: number | null;
  maxCapacity: number | null;
  checkInTime: string;
  checkOutTime: string;
  amount: number | null;
  images: Image[];
  options: Options;
};

export type RoomPostResponseData = {
  roomId: number;
  name: string;
  price: number | null;
  defaultCapacity: number | null;
  maxCapacity: number | null;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  amount: number | null;
  images: Image[];
  options: Options;
};

export type AccommodationData = {
  accommodationId: number;
};
