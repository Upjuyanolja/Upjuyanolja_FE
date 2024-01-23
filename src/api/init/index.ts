import { instance } from '..';
import {
  PostAccommodation,
  PostAccommodationParams,
  PostImageFile,
} from './type';
import { Response } from '@/types/api';

export const ACCOMMODATION_REGISTRATION_API = {
  postImageFile: (formData: FormData) =>
    instance.post<Response<PostImageFile>>(
      '/api/accommodations/images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    ),

  postAccommodationInfo: (params: PostAccommodationParams) =>
    instance.post<Response<PostAccommodation>>('/api/accommodations', {
      params,
    }),
};
