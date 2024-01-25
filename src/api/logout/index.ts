import { AxiosResponse } from 'axios';
import { instance } from '..';

export const LOGOUT_API = {
  deleteLogout: (): Promise<AxiosResponse> =>
    instance.delete('/api/auth/logout'),
};
