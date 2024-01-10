import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { AdditionalPurchaseInfo } from '../additional-purchase-info';

export const AdditionalPurchaseContent = () => {
  return (
    <>
      <StyledBatchEditContainer>
        <Checkbox />
        <TextBox color="primary" typography="h5" fontWeight={700}>
          수량 일괄 적용
        </TextBox>
        <StyledInput />
        <TextBox typography="body1" fontWeight={400}>
          장
        </TextBox>
      </StyledBatchEditContainer>
      <StyledInfoContainer>
        <StyledRoomInfo>
          <TextBox typography="h5" fontWeight={700}>
            스탠다드 트윈룸
          </TextBox>
          <AdditionalPurchaseInfo />
          <AdditionalPurchaseInfo />
        </StyledRoomInfo>
        <StyledRoomInfo>
          <TextBox typography="h5" fontWeight={700}>
            더블룸
          </TextBox>
          <AdditionalPurchaseInfo />
          <AdditionalPurchaseInfo />
        </StyledRoomInfo>
      </StyledInfoContainer>
    </>
  );
};

const StyledBatchEditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .ant-checkbox-inner {
    border: 1px solid ${colors.primary};
  }
  .ant-checkbox-wrapper {
    margin-right: 8px;
  }
`;

const StyledInput = styled(Input)`
  width: 114px;
  margin: 0 4px 0 18px;
`;

const StyledInfoContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledRoomInfo = styled.div`
  padding: 16px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;
