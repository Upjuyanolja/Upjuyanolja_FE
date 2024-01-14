import { SIGN_IN_API } from '@api/sign-in';
import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Response } from '@/types/api';
import { memberData, signInData } from '@api/sign-in/type';

export const usePostLogin = (
  options?: UseMutationOptions<
    AxiosResponse<Response<memberData>>,
    AxiosError,
    signInData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<memberData>>,
    AxiosError,
    signInData
  >((data: signInData) => SIGN_IN_API.postLogin(data), {
    ...options,
  });
};
