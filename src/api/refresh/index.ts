import { instance } from '..';
import { PostRefreshData, RefreshData } from './type';

export const REFRESH_API = {
  refreshToken: (data: RefreshData) =>
    instance.post<PostRefreshData>('/api/auth/refresh', data),
};
