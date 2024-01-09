import { HttpResponse } from 'msw';
import userInfoData from '@assets/data/userInfoData.json';

export const getUserInfoResolver = () => {
  return HttpResponse.json(userInfoData, { status: 200 });
};
