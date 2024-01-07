import { Space, Divider } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';

export const OrderPointInfo = ({ pointCharge }: { pointCharge: boolean }) => {
  return (
    <OrderPointInfoContainer direction="vertical">
      {pointCharge && (
        <div>
          <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
            포인트 충전
          </TextBox>
          <TitleDivider />
        </div>
      )}

      <OrderPointInfoList>
        <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
          {pointCharge ? '충전 포인트' : '결제 포인트'}
        </TextBox>
        <TextBox typography="body2" color={'primary'} fontWeight={'700'}>
          5000 P
        </TextBox>
      </OrderPointInfoList>
      <OrderPointInfoList>
        <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
          {pointCharge ? '결제 금액' : '보유 포인트'}
        </TextBox>
        <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
          5000 P
        </TextBox>
      </OrderPointInfoList>
      {!pointCharge && (
        <OrderPointInfoList>
          <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
            추가 충전 포인트
          </TextBox>
          <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
            5000 P
          </TextBox>
        </OrderPointInfoList>
      )}
    </OrderPointInfoContainer>
  );
};

const OrderPointInfoContainer = styled(Space)`
  margin-bottom: 16px;
`;
const TitleDivider = styled(Divider)`
  margin: 8px 0px;

  background-color: ${colors.black600};
`;
const OrderPointInfoList = styled(Space)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
