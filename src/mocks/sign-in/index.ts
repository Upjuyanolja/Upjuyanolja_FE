import { HttpResponse } from 'msw';

import signInData from '@assets/data/signInData.json';
import accomodationsData from '@assets/data/accomodationsData.json';
export const postSignInResolver = async () => {
  return HttpResponse.json(signInData, { status: 200 });
};
export const getAccomodationsResolver = () => {
  return HttpResponse.json(accomodationsData, { status: 400 });
};
