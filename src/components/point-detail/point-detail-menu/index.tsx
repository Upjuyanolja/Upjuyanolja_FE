import { Button, Space } from 'antd';

import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';

export const PointMenu = () => {
  return (
    <Space>
      <StyledMenuButtonWrap>
        <li>
          <StyledButton type="primary">
            <TextBox typography="body3" color="white" fontWeight="400">
              전체
            </TextBox>
          </StyledButton>
        </li>
        <li>
          <StyledButton>충전</StyledButton>
        </li>
        <li>
          <StyledButton>사용</StyledButton>
        </li>
      </StyledMenuButtonWrap>
    </Space>
  );
};
const StyledMenuButtonWrap = styled('ul')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 0;

  li {
    list-style-type: none;

    margin: 0;
  }
`;
const StyledButton = styled(Button)`
  width: 80px;
  height: 33px;

  border-color: ${colors.primary};
  border-radius: 2px;

  background-color: ${(props) =>
    props.type === 'primary' ? colors.primary : colors.white};
  color: ${(props) =>
    props.type === 'primary' ? colors.white : colors.primary};
`;
