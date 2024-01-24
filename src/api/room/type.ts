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
  rooms: RoomCardData[];
};

export type Options = {
  airCondition: boolean;
  tv: boolean;
  internet: boolean;
};

export type Image = {
  url: string;
};

export type ImageUrls = {
  urls: string[];
};

export type Coupons = {
  id: number;
  name: string;
  price: number;
};

export type RoomCardData = {
  id: number;
  name: string;
  basePrice: number | null;
  discountPrice: number | null;
  defaultCapacity: number | null;
  maxCapacity: number | null;
  checkInTime: string;
  checkOutTime: string;
  count: number | null;
  images: Image[];
  options: Options;
  coupons: Coupons[];
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

export type RoomDeleteResponseData = {
  id: number;
  name: string;
  price: number;
  defaultCapacity: number | null;
  maxCapacity: number | null;
  checkInTime: string;
  checkOutTime: string;
  soldOut: boolean;
  count: number;
  images: Image[];
  options: Options;
};

export type RoomUpdateData = {
  name: string;
  price: number | null;
  defaultCapacity: number | null;
  maxCapacity: number | null;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  amount: number | null;
  addImages: Image[];
  removeImages: Image[];
  options: Options;
};

export type RoomUpdateResponseData = {
  id: number;
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
