import { LogoutOutlined } from '@ant-design/icons';
import TextBox from '@components/text';
import styled from 'styled-components';

export const SignOutBtn = () => {
  return (
    <Container>
      <StyledLogoutOutlined />
      <TextBox typography="body2" color="black700">
        로그아웃
      </TextBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  margin: 0 8px 14px 0;
  cursor: pointer;
`;

const StyledLogoutOutlined = styled(LogoutOutlined)`
  font-size: 16px;
`;
