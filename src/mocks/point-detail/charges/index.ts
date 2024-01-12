import { HttpResponse } from 'msw';
import pointDetailChargesData from '@assets/data/pointDetailChargesData.json';

export const getPointDetailChargesResolver = () => {
  return HttpResponse.json(pointDetailChargesData, { status: 200 });
};
