import { badgeProps } from '@components/point-detail/badge/types';

export interface Receipt {
  orderId: string;
  tradeAt: string;
  amount: string;
}

export interface History {
  id: number;
  category: string;
  type: string;
  status: badgeProps;
  name: string;
  description: string;
  trade: string;
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
