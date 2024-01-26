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
  default: 'charges',
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
    pageNum: -1,
    pageSize: -1,
    totalPages: -1,
    totalElements: -1,
    isLast: true,
    histories: [
      {
        id: -1,
        category: '',
        type: '',
        status: '구매 확정',
        name: '',
        description: '',
        trade: -1,
        amount: -1,
        receipt: {
          orderId: '',
          tradeAt: '',
          amount: '',
          orders: [
            {
              room: '',
              coupons: [
                {
                  name: '',
                  count: -1,
                  totalPrice: -1,
                },
                {
                  name: '',
                  count: -1,
                  totalPrice: -1,
                },
              ],
            },
          ],
        },
      },
    ],
  },
});
