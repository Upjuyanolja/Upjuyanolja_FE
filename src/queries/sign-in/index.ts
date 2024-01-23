import { SIGN_IN_API } from '@api/sign-in';
import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Response } from '@/types/api';
import { MemberData, SignInData } from '@api/sign-in/type';

export const usePostLogin = (
  options?: UseMutationOptions<
    AxiosResponse<MemberData>,
    AxiosError,
    SignInData
  >,
) => {
  return useMutation<AxiosResponse<MemberData>, AxiosError, SignInData>(
    (data: SignInData) => SIGN_IN_API.postLogin(data),
    {
      ...options,
    },
  );
};
