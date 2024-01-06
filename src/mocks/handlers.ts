import { http, HttpResponse } from 'msw';
import signInData from '../data/sign-in/signInData.json';
import accomodationsData from '../data/sign-in/accomodationsData.json';
const postSignInResolver = async () => {
  return HttpResponse.json(signInData, { status: 400 });
};
const getAccomodationsResolver = () => {
  return HttpResponse.json(accomodationsData, { status: 400 });
};
export const handlers = [
  http.post('/api/auth/owner/signin', postSignInResolver),
  http.get('/api/accommodations/backoffice', getAccomodationsResolver),
];
