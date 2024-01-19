import { PostImageFile } from '@api/init/type';
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

//숙소 등록 요청은 나중에 추가할 예정
