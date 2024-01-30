import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  AuthenticationData,
  PostAuthenticationData,
  PostSignUpResData,
  SignUpData,
} from '@api/sign-up/type';
import { SIGN_UP_API } from '@api/sign-up';

export const usePostSignUp = (
  options?: UseMutationOptions<
    AxiosResponse<PostSignUpResData>,
    AxiosError,
    SignUpData
  >,
) => {
  return useMutation<AxiosResponse<PostSignUpResData>, AxiosError, SignUpData>(
    (data: SignUpData) => SIGN_UP_API.signUp(data),
    {
      ...options,
    },
  );
};

export const usePostAuthentication = (
  options?: UseMutationOptions<
    AxiosResponse<PostAuthenticationData>,
    AxiosError,
    AuthenticationData
  >,
) => {
  return useMutation<
    AxiosResponse<PostAuthenticationData>,
    AxiosError,
    AuthenticationData
  >((data: AuthenticationData) => SIGN_UP_API.authentication(data), {
    ...options,
  });
};
