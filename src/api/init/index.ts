import { instance } from '..';
import {
  PostAccommodation,
  PostAccommodationParams,
  PostImageFile,
} from './type';
import { Response } from '@/types/api';

export const ACCOMMODATION_API = {
  postImageFile: (formData: FormData) =>
    instance.post<Response<PostImageFile>>(
      '/api/accommodations/images',
      formData,
    ),

  postAccommodationInfo: (params: PostAccommodationParams) =>
    instance.post<Response<PostAccommodation>>('/api/accommodations', {
      params,
    }),
};
