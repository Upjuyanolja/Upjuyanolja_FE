import { Button, Space } from 'antd';
import styled from 'styled-components';
import TextBox from '@components/text';
import { colors } from '@/constants/colors';
import { StyledSpaceProps } from './type';

export const UserProfile = () => {
  return (
    <StyledSpace
      direction="vertical"
      align="center"
      borderColor={colors.black500}
    >
      <TextBox typography="h5" color={'primary'} bold={true}>
        김업주 님
      </TextBox>
      <TextBox typography="h3" color={'black900'} bold={true}>
        330,000 P
      </TextBox>
      <StyledButton type="primary" size="large">
        포인트 추가하기
      </StyledButton>
    </StyledSpace>
  );
};

const StyledSpace = styled(Space)<StyledSpaceProps>`
  display: flex;
  gap: 4px;
  padding: 24px 30px;
  border-bottom: 1px solid ${(props) => props.borderColor};
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 196px;
  margin-top: 8px;
`;
