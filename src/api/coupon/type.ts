export type staticsData = {
  total: number;
  used: number;
  stock: number;
};

export type dailyRevenue = {
  day: string;
  couponRevenue: number;
  normalRevenue: number;
};
export type revenueData = {
  revenue: dailyRevenue[];
};

export type coupon = {
  couponId: number;
  status: 'ENABLE' | 'DISABLED' | 'SOLD_OUT';
  discountType: 'FLAT' | 'RATE';
  couponName: string;
  appliedPrice: number;
  dayLimit: number;
  quantity: number;
  discount: number;
  couponType: 'WEEKDAYS' | 'WEEKENDS' | 'ALL_DAYS';
};
export type room = {
  roomId: number;
  roomName: string;
  roomPrice: number;
  coupons: coupon[];
};

export type coupons = {
  accommodationId: number;
  accommodationName: string;
  expiry: string;
  rooms: room[];
};

export type CouponRoomList = {
  accommodationId: number;
  accommodationName: string;
  rooms: Pick<room, 'roomId' | 'roomName' | 'roomPrice'>[];
};
