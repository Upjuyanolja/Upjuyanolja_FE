import { instance } from '..';
import {
  PostAccommodation,
  PostAccommodationParams,
  PostImageFile,
} from './type';

export const ACCOMMODATION_REGISTRATION_API = {
  imageFile: (formData: FormData) =>
    instance.post<PostImageFile>('/backoffice-api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  accommodationInfo: (params: PostAccommodationParams) =>
    instance.post<PostAccommodation>('/backoffice-api/accommodations', params),
};
