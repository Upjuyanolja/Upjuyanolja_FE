import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  authenticationData,
  postAuthenticationData,
  postSignUpResData,
  signUpData,
} from '@api/sign-up/type';
import { Response } from '@/types/api';
import { SIGN_UP_API } from '@api/sign-up';

export const usePostSignUp = (
  options?: UseMutationOptions<
    AxiosResponse<Response<postSignUpResData>>,
    AxiosError,
    signUpData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<postSignUpResData>>,
    AxiosError,
    signUpData
  >((data: signUpData) => SIGN_UP_API.postSignUp(data), {
    ...options,
  });
};

export const usePostAuthentication = (
  options?: UseMutationOptions<
    AxiosResponse<Response<postAuthenticationData>>,
    AxiosError,
    authenticationData
  >,
) => {
  return useMutation<
    AxiosResponse<Response<postAuthenticationData>>,
    AxiosError,
    authenticationData
  >((data: authenticationData) => SIGN_UP_API.postAuthentication(data), {
    ...options,
  });
};
