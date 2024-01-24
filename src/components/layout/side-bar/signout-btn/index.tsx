import { RESPONSE_CODE } from '@/constants/api';
import { ROUTES } from '@/constants/routes';
import { LogoutOutlined } from '@ant-design/icons';
import { TextBox } from '@components/text-box';
import { removeCookie } from '@hooks/sign-in/useSignIn';
import { useDeleteLogout } from '@queries/logout';
import { message } from 'antd';
import { AxiosError } from 'axios';
import styled from 'styled-components';

export const SignOutBtn = () => {
  const deleteLogoutMutation = useDeleteLogout({
    onSuccess() {
      removeCookie('accessToken');
      removeCookie('refreshToken');
      removeCookie('accommodationId');
      localStorage.clear();
      setTimeout(() => {
        window.location.href = ROUTES.SIGNIN;
      }, 1000);
    },
    onError(error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data;
        if (errorData.code === RESPONSE_CODE.NOT_FOUND_MEMBER) {
          message.error({
            content: (
              <TextBox typography="body3" fontWeight={'400'}>
                회원 정보를 찾을 수 없습니다.
              </TextBox>
            ),
            duration: 2,
          });
          removeCookie('accessToken');
          removeCookie('refreshToken');
          removeCookie('accommodationId');
          localStorage.clear();
          setTimeout(() => {
            window.location.href = ROUTES.SIGNIN;
          }, 1000);
        } else {
          message.error({
            content: (
              <TextBox typography="body3" fontWeight={'400'}>
                이미 로그아웃한 회원입니다.
              </TextBox>
            ),
            duration: 2,
          });
          removeCookie('accessToken');
          removeCookie('refreshToken');
          removeCookie('accommodationId');
          localStorage.clear();
          setTimeout(() => {
            window.location.href = ROUTES.SIGNIN;
          }, 1000);
        }
      }
    },
  });
  const handleSignOut = () => {
    deleteLogoutMutation.mutate();
  };
  return (
    <StyledContainer>
      <StyledLogoutOutlined />
      <TextBox typography="body2" color="black700" onClick={handleSignOut}>
        로그아웃
      </TextBox>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 4px;
  margin: 0 8px 14px 0;
  padding: 14px 0 0 0;
  cursor: pointer;
`;

const StyledLogoutOutlined = styled(LogoutOutlined)`
  font-size: 16px;
`;
