import { Response } from '@/types/api';
import { MEMBER_API } from '@api/member';
import { userInfoData } from '@api/member/type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useGetUserInfo = (
  options?: UseQueryOptions<
    AxiosResponse<Response<userInfoData>>,
    AxiosError,
    userInfoData
  >,
) => {
  return useQuery<
    AxiosResponse<Response<userInfoData>>,
    AxiosError,
    userInfoData
  >(['getUserInfo'], () => MEMBER_API.getUserInfo(), { ...options });
};
