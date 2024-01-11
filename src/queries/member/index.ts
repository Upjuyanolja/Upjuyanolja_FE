import { Response } from '@/types/api';
import { MEMBER_API } from '@api/member';
import { UserInfoData } from '@api/member/type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useGetUserInfo = (
  options?: UseQueryOptions<
    AxiosResponse<Response<UserInfoData>>,
    AxiosError,
    UserInfoData
  >,
) => {
  return useQuery<
    AxiosResponse<Response<UserInfoData>>,
    AxiosError,
    UserInfoData
  >(['getUserInfo'], () => MEMBER_API.getUserInfo(), { ...options });
};
