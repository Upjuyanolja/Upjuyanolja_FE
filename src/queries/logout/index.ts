import { LOGOUT_API } from '@api/logout';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';

export const useDeleteLogout = (
  options?: UseMutationOptions<AxiosResponse, AxiosError>,
) => {
  return useMutation<AxiosResponse, AxiosError>(
    () => LOGOUT_API.deleteLogout(),
    {
      ...options,
    },
  );
};
