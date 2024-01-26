import { instance } from '..';
import { AccommodationListData } from './type';

export const ACCOMMODATION_API = {
  getAccommodationList: () =>
    instance.get<AccommodationListData>('/backoffice-api/accommodations'),
};
