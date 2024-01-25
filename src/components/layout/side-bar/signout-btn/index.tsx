import { ROUTES } from '@/constants/routes';
import { LogoutOutlined } from '@ant-design/icons';
import { TextBox } from '@components/text-box';
import { removeCookie } from '@hooks/sign-in/useSignIn';
import styled from 'styled-components';

export const SignOutBtn = () => {
  const handleSignOut = () => {
    // 여기에 로그아웃 api 연결할 예정
    // 밑에는 onSuccess 시 할 일
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('accommodationId');
    localStorage.clear();
    window.location.href = ROUTES.SIGNIN;
    // 여기 밑에는 onError 시 할 일 추가할 예정
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
