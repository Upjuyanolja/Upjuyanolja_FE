import { HttpResponse } from 'msw';
import accommodationListData from '@assets/data/accommodationListData.json';

export const getAccommodationListResolver = () => {
  return HttpResponse.json(accommodationListData, { status: 200 });
};
