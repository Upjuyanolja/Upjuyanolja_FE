import { Response } from '@/types/api';
import { instance } from '..';
import { UserInfoData } from './type';

export const MEMBER_API = {
  getUserInfo: () => instance.get<Response<UserInfoData>>('/api/member'),
};
