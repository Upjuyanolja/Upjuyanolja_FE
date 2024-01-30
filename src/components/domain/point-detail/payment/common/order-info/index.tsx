import { Space } from 'antd';
import { TextBox } from '@components/atom/text-box';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { pointDetailDataState } from '@stores/point-detail/atoms';

export const OrderInfo = ({ index }: { index: number }) => {
  const pointDetailData = useRecoilValue(pointDetailDataState);

  return (
    <OrderInfoWrap direction="vertical">
      <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
        주문번호 : {pointDetailData.histories[index].receipt.orderId}
      </TextBox>

      <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
        거래일시 : {pointDetailData.histories[index].receipt.tradeAt}
      </TextBox>
      {pointDetailData.histories[index].receipt.accommodationName && (
        <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
          숙소명: {pointDetailData.histories[index].receipt.accommodationName}
        </TextBox>
      )}
    </OrderInfoWrap>
  );
};
const OrderInfoWrap = styled(Space)`
  margin-bottom: 36px;
`;
