import { instance } from '..';
import { AccommodationListData } from './type';

export const ACCOMMODATION_API = {
  accommodationList: () =>
    instance.get<AccommodationListData>('/backoffice-api/accommodations'),
};
