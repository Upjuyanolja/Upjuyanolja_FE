import { badgeProps } from '@components/point-detail/badge/types';

export interface Coupons {
  name: string;
  count: number;
  totalPrice: number;
}

export interface Orders {
  room: string;
  coupons: Coupons[];
}

export interface Receipt {
  orderId: string;
  tradeAt: string;
  amount: string;
  accommodationName?: string;
  orders?: Orders[];
}

export interface History {
  id: number;
  category: string;
  type: string;
  status: badgeProps;
  name: string;
  description: string;
  trade: number;
  amount: number;
  receipt: Receipt;
}

export interface PointDetailDataType {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  histories: History[];
}

export type menuStatusType = 'total' | 'charges' | 'usage';
