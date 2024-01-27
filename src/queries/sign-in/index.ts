import { SIGN_IN_API } from '@api/sign-in';
import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { MemberData, SignInData } from '@api/sign-in/type';
import { ErrorResponse } from '@/types/api';

export const usePostLogin = (
  options?: UseMutationOptions<
    AxiosResponse<MemberData>,
    AxiosError<ErrorResponse>,
    SignInData
  >,
) => {
  return useMutation<
    AxiosResponse<MemberData>,
    AxiosError<ErrorResponse>,
    SignInData
  >((data: SignInData) => SIGN_IN_API.postLogin(data), {
    ...options,
  });
};
