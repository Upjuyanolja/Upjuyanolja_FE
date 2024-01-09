import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { colors } from '@/constants/colors';

export const PageComp = () => {
  return (
    <StyledSpace>
      <StyledPageButton color={colors.neutral5}>
        <LeftOutlined />
      </StyledPageButton>

      <StyledPageButton color={colors.primary}>1</StyledPageButton>

      <StyledPageButton>2</StyledPageButton>

      <StyledPageButton>3</StyledPageButton>

      <StyledPageButton>4</StyledPageButton>

      <StyledPageButton>5</StyledPageButton>

      <StyledPageButton>
        <RightOutlined />
      </StyledPageButton>
    </StyledSpace>
  );
};

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 16px;
`;

const StyledPageButton = styled(Button)`
  width: 32px;
  height: 32px;

  font-size: 14px;
  line-height: 22px;

  padding: 0px;

  color: ${(props) => props.color};
  border-color: ${(props) => props.color};
`;
