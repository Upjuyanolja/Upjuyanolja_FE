import { HttpResponse } from 'msw';

import signInData from '@assets/data/signInData.json';

export const postSignInResolver = async () => {
  return HttpResponse.json(signInData, { status: 200 });
};
