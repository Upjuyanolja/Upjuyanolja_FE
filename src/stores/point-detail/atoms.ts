import { atom } from 'recoil';
import {
  PointDetailDataType,
  menuStatusType,
} from '@api/point-detail/get-point-detail/type';
import { pointSummaryData } from '@api/point/type';

export const currentYearState = atom({
  key: 'currentYearState',
  default: new Date().getFullYear(),
});

export const currentMonthState = atom({
  key: 'currentMonthState',
  default: new Date().getMonth() + 1,
});

export const pageNumState = atom({
  key: 'pageNumState',
  default: 1,
});

export const totalPagesState = atom({
  key: 'totalPagesState',
  default: 10,
});

export const menuStatusState = atom<menuStatusType>({
  key: 'menuStatusState',
  default: 'total',
});

export const pointSummaryDataState = atom<pointSummaryData>({
  key: 'pointSummaryDataState',
  default: {
    chargePoint: 0,
    usePoint: 0,
    currentPoint: 0,
  },
});

export const pointDetailDataState = atom<PointDetailDataType>({
  key: 'pointDetailDataState',
  default: {
    pageNum: 1,
    pageSize: 4,
    totalPages: 10,
    totalElements: 40,
    isLast: true,
    histories: [
      {
        id: 1,
        category: '충전',
        type: '포인트',
        status: '구매 확정',
        name: '포인트 충전',
        description: '',
        trade: 5000,
        amount: 5000,
        receipt: {
          orderId: 'O-1644460169123',
          tradeAt: '2023.12.20 18:06',
          amount: '5000',
          orders: [
            {
              room: '스탠다드 트윈 룸',
              coupons: [
                {
                  name: '1,000원 쿠폰 | 100P',
                  count: 2,
                  totalPrice: 100,
                },
                {
                  name: '1,000원 쿠폰 | 100P',
                  count: 1,
                  totalPrice: 50,
                },
              ],
            },
          ],
        },
      },
    ],
  },
});
