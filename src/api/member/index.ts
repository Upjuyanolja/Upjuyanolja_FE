import { Response } from '@/types/api';
import { instance } from '..';
import { UserInfoData } from './type';

export const MEMBER_API = {
  userInfo: () => instance.get<Response<UserInfoData>>('/api/member'),
};
