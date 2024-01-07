import { instance } from '..';
import { signInData } from './type';

export const SIGN_IN_API = {
  postLogin: (data: signInData) =>
    instance.post('/api/auth/owner/signin', {
      data,
    }),
  getAccomodations: () => instance.get('/api/accommodations/backoffice'),
};
