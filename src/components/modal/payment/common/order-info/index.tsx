import { Space } from 'antd';
import React from 'react';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';

export const OrderInfo = () => {
  return (
    <OrderInfoWrap direction="vertical">
      <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
        주문번호: 23459-1
      </TextBox>

      <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
        거래일시: 2023.12.20. 18:06
      </TextBox>
    </OrderInfoWrap>
  );
};
const OrderInfoWrap = styled(Space)`
  margin-bottom: 36px;
`;
