import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  AuthenticationData,
  PostAuthenticationData,
  PostSignUpResData,
  SignUpData,
} from '@api/sign-up/type';
import { Response } from '@/types/api';
import { SIGN_UP_API } from '@api/sign-up';

export const usePostSignUp = (
  options?: UseMutationOptions<
    AxiosResponse<Response<PostSignUpResData>>,
    AxiosError,
    SignUpData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<PostSignUpResData>>,
    AxiosError,
    SignUpData
  >((data: SignUpData) => SIGN_UP_API.postSignUp(data), {
    ...options,
  });
};

export const usePostAuthentication = (
  options?: UseMutationOptions<
    AxiosResponse<Response<PostAuthenticationData>>,
    AxiosError,
    AuthenticationData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<PostAuthenticationData>>,
    AxiosError,
    AuthenticationData
  >((data: AuthenticationData) => SIGN_UP_API.postAuthentication(data), {
    ...options,
  });
};
