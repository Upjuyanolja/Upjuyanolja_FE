import { Response } from '@/types/api';
import { instance } from '..';
import { AccommodationListData } from './type';

export const ACCOMMODATION_API = {
  getAccommodationList: () =>
    instance.get<Response<AccommodationListData>>(
      '/api/accommodations/backoffice',
    ),
};
