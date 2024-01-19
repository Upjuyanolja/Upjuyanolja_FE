import { HttpResponse } from 'msw';
import postAccommodationData from '@assets/data/accommodationsData.json';
import postImageFileData from '@assets/data/postImageFileData.json';

export const postAccommodationInfoResolver = () => {
  return HttpResponse.json(postAccommodationData, { status: 200 });
};

export const postImageFileResolver = () => {
  return HttpResponse.json(postImageFileData, { status: 200 });
};
