import buyCouponData from '@assets/data/buyCouponData.json';
import couponRoomListData from '@assets/data/couponRoomListData.json';

import { HttpResponse } from 'msw';

export const getCouponRoomListResolver = () => {
  return HttpResponse.json(couponRoomListData, { status: 200 });
};

export const buyCouponResolver = () => {
  return HttpResponse.json(buyCouponData, { status: 200 });
};
