import { colors } from '@/constants/colors';
import { Button, Image } from 'antd';
import coinImage from '@assets/image/mainCoinImage.png';
import React from 'react';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { RightOutlined } from '@ant-design/icons';
import { mainNavigationContainerProps } from './type';

export const MainNavigationContainer = ({
  navigateCouponRegistration,
}: mainNavigationContainerProps) => {
  return (
    <StyledContainer color={colors.primary}>
      <Image width={50} height={50} src={coinImage} preview={false} />
      <TextBox typography="h5" color="white">
        지금 바로!
      </TextBox>
      <StyledButton type="link" onClick={navigateCouponRegistration}>
        쿠폰 만들기 <RightOutlined color="white" />
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  width: 224px;
  height: 171px;

  background-color: ${(props) => props.color};
  border-radius: 8px;
  padding: 0px 24px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  padding: 0;
  border: 0;

  font-size: 24px;
  font-weight: 700;
  color: white;
  &.ant-btn-link:hover {
    color: white;
  }
  &.ant-btn-link:active {
    color: white;
  }
  &.ant-btn-link:focus {
    color: white;
  }
`;
