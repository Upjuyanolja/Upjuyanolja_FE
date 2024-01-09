import { Response } from '@/types/api';
import { instance } from '..';
import { userInfoData } from './type';

export const MEMBER_API = {
  getUserInfo: () => instance.get<Response<userInfoData>>('/api/member'),
};
