export type onFinishValues = {
  'room-name': string;
  price: string;
  defaultCapacity: number;
  maxCapacity: number;
  checkInTime: moment.Moment;
  checkOutTime: moment.Moment;
  count: number;
};

export type RoomListResponseData = {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
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
