import { instance } from '..';
import {
  PostAccommodation,
  PostAccommodationParams,
  PostImageFile,
} from './type';

export const ACCOMMODATION_REGISTRATION_API = {
  postImageFile: (formData: FormData) =>
    instance.post<PostImageFile>('/api/accommodations/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  postAccommodationInfo: (params: PostAccommodationParams) =>
    instance.post<PostAccommodation>('/api/accommodations', params),
};
