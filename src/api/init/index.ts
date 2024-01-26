import { instance } from '..';
import {
  PostAccommodation,
  PostAccommodationParams,
  PostImageFile,
} from './type';

export const ACCOMMODATION_REGISTRATION_API = {
  postImageFile: (formData: FormData) =>
    instance.post<PostImageFile>('/backoffice-api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  postAccommodationInfo: (params: PostAccommodationParams) =>
    instance.post<PostAccommodation>('/backoffice-api/accommodations', params),
};
