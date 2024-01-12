import { HttpResponse } from 'msw';
import pointDetailUsageData from '@assets/data/pointDetailUsageData.json';

export const getPointDetailUsageResolver = () => {
  return HttpResponse.json(pointDetailUsageData, { status: 200 });
};
