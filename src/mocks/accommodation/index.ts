import { HttpResponse } from 'msw';
import accommodationsData from '@assets/data/accommodationsData.json';

export const getAccommodationsResolver = () => {
  return HttpResponse.json(accommodationsData, { status: 401 });
};
