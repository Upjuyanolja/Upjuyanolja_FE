import { Space, Divider } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';
import { orderInfoProps } from './types';
import { useRecoilValue } from 'recoil';
import { pointDetailDataState } from '@stores/point-detail/atoms';
import { numberFormat } from '@/utils/Format/numberFormat';

export const OrderPointInfo = ({
  pointCharge,
  index,
  status,
}: orderInfoProps) => {
  const [isCancelStatus, setIscancelStatus] = useState<boolean>(false);

  useEffect(() => {
    if (status === '취소 완료') {
      setIscancelStatus(true);
    }
  }, []);
  const pointDetailData = useRecoilValue(pointDetailDataState);

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
          {pointCharge
            ? isCancelStatus
              ? '환불 예정 포인트'
              : '충전 포인트'
            : '결제 포인트'}
        </TextBox>
        <TextBox typography="body2" color={'primary'} fontWeight={'700'}>
          {numberFormat(pointDetailData.histories[index].amount)} P
        </TextBox>
      </OrderPointInfoList>
      <OrderPointInfoList>
        <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
          {isCancelStatus ? '환불 예정 금액' : '결제 금액'}
        </TextBox>
        <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
          {numberFormat(pointDetailData.histories[index].amount)} 원
        </TextBox>
      </OrderPointInfoList>
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
