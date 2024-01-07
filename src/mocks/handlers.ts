import { http } from 'msw';
import { postSignInResolver, getAccomodationsResolver } from './sign-in';

export const handlers = [
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.get('/api/accommodations/backoffice', getAccomodationsResolver),
];
