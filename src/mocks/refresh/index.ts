import { HttpResponse } from 'msw';
import refreshData from '@assets/data/refreshData.json';
export const postRefreshResolver = () => {
  return HttpResponse.json(refreshData, { status: 200 });
};
