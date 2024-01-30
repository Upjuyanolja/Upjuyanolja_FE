import {
  PostAccommodation,
  PostAccommodationParams,
  PostImageFile,
} from '@api/init/type';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '@/types/api';
import { ACCOMMODATION_REGISTRATION_API } from '@api/init';

export const useImageFile = (
  options?: UseMutationOptions<
    AxiosResponse<PostImageFile>,
    AxiosError<ErrorResponse>,
    FormData
  >,
) => {
  return useMutation<
    AxiosResponse<PostImageFile>,
    AxiosError<ErrorResponse>,
    FormData
  >(
    (formData: FormData) => ACCOMMODATION_REGISTRATION_API.imageFile(formData),
    {
      ...options,
    },
  );
};

export const useAccommodationInfo = (
  options?: UseMutationOptions<
    AxiosResponse<PostAccommodation>,
    AxiosError<ErrorResponse>,
    PostAccommodationParams
  >,
) => {
  return useMutation<
    AxiosResponse<PostAccommodation>,
    AxiosError<ErrorResponse>,
    PostAccommodationParams
  >(
    (params: PostAccommodationParams) =>
      ACCOMMODATION_REGISTRATION_API.accommodationInfo(params),
    {
      ...options,
    },
  );
};
