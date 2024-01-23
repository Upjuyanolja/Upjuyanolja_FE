import { instance } from '..';
import { PostRefreshData, RefreshData } from './type';
import { Response } from '@/types/api';

export const REFRESH_API = {
  postRefresh: (data: RefreshData) =>
    instance.post<Response<PostRefreshData>>('/api/auth/refresh', data),
};
