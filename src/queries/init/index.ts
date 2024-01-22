import {
  PostAccommodation,
  PostAccommodationParams,
  PostImageFile,
} from '@api/init/type';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Response } from '@/types/api';
import { ACCOMMODATION_REGISTRATION_API } from '@api/init';

export const useImageFile = (
  options?: UseMutationOptions<
    AxiosResponse<Response<PostImageFile>>,
    AxiosError,
    FormData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<PostImageFile>>,
    AxiosError,
    FormData
  >(
    (formData: FormData) =>
      ACCOMMODATION_REGISTRATION_API.postImageFile(formData),
    {
      ...options,
    },
  );
};

export const useAccommodationInfo = (
  options?: UseMutationOptions<
    AxiosResponse<Response<PostAccommodation>>,
    AxiosError,
    PostAccommodationParams
  >,
) => {
  return useMutation<
    AxiosResponse<Response<PostAccommodation>>,
    AxiosError,
    PostAccommodationParams
  >(
    (params: PostAccommodationParams) =>
      ACCOMMODATION_REGISTRATION_API.postAccommodationInfo(params),
    {
      ...options,
    },
  );
};
