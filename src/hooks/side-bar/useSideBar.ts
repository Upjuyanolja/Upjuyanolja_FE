import { useGetUserInfo } from '@queries/member';

export const useSideBar = () => {
  const { data: userInfoData, isError: isUserInfoError } = useGetUserInfo({
    select(data) {
      return data.data.data;
    },
    staleTime: 60 * 60 * 1000,
  });

  return {
    userInfoData,
    isUserInfoError,
  };
};
