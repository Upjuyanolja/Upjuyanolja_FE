import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { PostRefreshData, RefreshData } from '@api/refresh/type';
import { Response } from '@/types/api';
import { REFRESH_API } from '@api/refresh';
export const usePostRefresh = (
  options?: UseMutationOptions<
    AxiosResponse<Response<PostRefreshData>>,
    AxiosError,
    RefreshData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<PostRefreshData>>,
    AxiosError,
    RefreshData
  >((data: RefreshData) => REFRESH_API.postRefresh(data), {
    ...options,
  });
};
