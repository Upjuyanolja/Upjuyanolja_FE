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
  status: string;
  discountType: 'FLAT' | 'RATE';
  couponName: string;
  appliedPrice: number;
  dayLimit: number;
  quantity: number;
  discount: number;
  couponType: string;
};

export type EditCoupon = {
  couponId: number;
  status: string;
  discountType: 'FLAT' | 'RATE';
  discount: number;
  dayLimit: number;
  couponType: string;
};
export type room<T> = {
  roomId: number;
  roomName: string;
  roomPrice: number;
  coupons: T[];
};

export type coupons = {
  accommodationId: number;
  accommodationName: string;
  expiry: string;
  rooms: room<coupon>[];
};
export type CouponDeleteParams = {
  accommodationId: number;
  rooms: { roomId: number; coupons: { couponId: number }[] }[];
};

export type CouponEditParams = {
  accommodationId: number;
  expiry: string;
  rooms: Omit<room<EditCoupon>, 'roomPrice' | 'roomName'>[];
};

export type CouponRoomList = {
  accommodationId: number;
  accommodationName: string;
  rooms: Pick<room<coupon>, 'roomId' | 'roomName' | 'roomPrice'>[];
};

export type PurchaseCouponParams = {
  accommodationId: number;
  expiry: string;
  totalPoints: number;
  rooms: Omit<
    room<
      Omit<coupon, 'couponName' | 'appliedPrice' | 'quantity'> & {
        eachPoint: number;
        buyQuantity: number;
      }
    >,
    'roomName' | 'roomPrice'
  >[];
};
