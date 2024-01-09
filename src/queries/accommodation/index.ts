import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Response } from '@/types/api';
import { AccommodationListData } from '@api/accommodation/type';
import { ACCOMMODATION_API } from '@api/accommodation';

export const useGetAccommodationList = (
  options?: UseQueryOptions<
    AxiosResponse<Response<AccommodationListData>>,
    AxiosError,
    AccommodationListData
  >,
) => {
  return useQuery<
    AxiosResponse<Response<AccommodationListData>>,
    AxiosError,
    AccommodationListData
  >(['getAccommodationList'], () => ACCOMMODATION_API.getAccommodationList(), {
    ...options,
  });
};
