import couponRoomListData from '@assets/data/couponRoomListData.json';

import { HttpResponse } from 'msw';

export const getCouponRoomListResolver = () => {
  return HttpResponse.json(couponRoomListData, { status: 200 });
};
