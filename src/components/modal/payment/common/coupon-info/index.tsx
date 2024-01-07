import { Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';

export const CouponInfo = () => {
  return (
    <CouponInfoWrap direction="vertical">
      <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
        결제 쿠폰
      </TextBox>
      <CouponDetailBox>
        <TextBox
          typography="body2"
          color={'black900'}
          fontWeight={'700'}
          className="couponDetail-title"
        >
          5% 할인쿠폰
        </TextBox>
        <TextBox typography="body2" color={'black900'} fontWeight={'400'}>
          패캠스테이 삼성점|슽낸다드, 스탠다드 더블, 프리미엄
        </TextBox>
        <TextBox typography="body2" color={'black900'} fontWeight={'400'}>
          주문수량: 100개
        </TextBox>
      </CouponDetailBox>
    </CouponInfoWrap>
  );
};
const CouponInfoWrap = styled(Space)`
  margin-bottom: 36px;
`;
const CouponDetailBox = styled('div')`
  width: 100%;

  display: flex;
  flex-direction: column;

  border: 2px solid #0351ff;
  border-radius: 8px;

  padding: 8px;
  .couponDetail-title {
    margin-bottom: 8px;
  }
`;
