import {
  AccommodationId,
  BuyCouponDiscount,
  BuyCouponEachPoint,
  BuyCouponQuantity,
  BuyCouponTotalPoints,
  RoomId,
} from '@components/coupon-registration/type';

export type StaticsData = {
  accommodationId: number;
  total: number;
  used: number;
  stock: number;
};

export type DailyRevenue = {
  revenueDate: string;
  couponRevenue: number;
  normalRevenue: number;
};
export type RevenueData = {
  accommodationId: number;
  revenue: DailyRevenue[];
  couponMessage: string;
};

export type Coupon = {
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
export type Room<T> = {
  roomId: number;
  roomName: string;
  roomPrice: number;
  coupons: T[];
};

export type Coupons = {
  accommodationId: number;
  accommodationName: string;
  expiry: string;
  rooms: Room<Coupon>[];
};
export type CouponDeleteParams = {
  accommodationId: number;
  rooms: { roomId: number; coupons: { couponId: number }[] }[];
};

export type CouponEditParams = {
  accommodationId: number;
  expiry: string;
  rooms: Omit<Room<EditCoupon>, 'roomPrice' | 'roomName'>[];
};

export type CouponRoomList = {
  accommodationId: number;
  accommodationName: string;
  rooms: Pick<Room<Coupon>, 'roomId' | 'roomName' | 'roomPrice'>[];
};

export type BuyCouponParams = {
  accommodationId: AccommodationId;
  totalPoints: BuyCouponTotalPoints;
  rooms: BuyCouponRoomData[];
};

export type BuyCouponData = {
  data: string;
  code?: number;
};

export type BuyCouponRoomData = {
  roomId: RoomId;
  discountType: string;
  discount: BuyCouponDiscount;
  quantity: BuyCouponQuantity;
  eachPoint: BuyCouponEachPoint;
};

export type PurchaseCouponParams = {
  accommodationId: number;
  expiry: string;
  totalPoints: number;
  rooms: Omit<
    Room<
      Omit<Coupon, 'couponName' | 'appliedPrice' | 'quantity'> & {
        eachPoint: number;
        buyQuantity: number;
      }
    >,
    'roomName' | 'roomPrice'
  >[];
};
