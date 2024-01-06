import { Button, Space } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';

export const UserProfile = () => {
  return (
    <StyledSpace direction="vertical" align="center">
      <TextBox typography="h5" color="primary" fontWeight="bold">
        김업주 님
      </TextBox>
      <TextBox typography="h3" color="black900" fontWeight="bold">
        330,000 P
      </TextBox>
      <StyledButton type="primary" size="large">
        포인트 추가하기
      </StyledButton>
    </StyledSpace>
  );
};

const StyledSpace = styled(Space)`
  display: flex;
  gap: 4px;
  padding: 24px 30px;
  border-bottom: 1px solid ${colors.black500};
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 196px;
  margin-top: 8px;
`;
