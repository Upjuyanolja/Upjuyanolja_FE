import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AccommodationListData } from '@api/accommodation/type';
import { ACCOMMODATION_API } from '@api/accommodation';

export const useGetAccommodationList = (
  options?: UseQueryOptions<
    AxiosResponse<AccommodationListData>,
    AxiosError,
    AccommodationListData
  >,
) => {
  return useQuery<
    AxiosResponse<AccommodationListData>,
    AxiosError,
    AccommodationListData
  >(['getAccommodationList'], () => ACCOMMODATION_API.accommodationList(), {
    ...options,
  });
};
