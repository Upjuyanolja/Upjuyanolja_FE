import { Space } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { pointDetailDataState } from '@stores/point-detail/atoms';
import { useRecoilValue } from 'recoil';
import { numberFormat } from '@/utils/Format/numberFormat';

export const CouponInfo = ({ index }: { index: number }) => {
  const pointDetailData = useRecoilValue(pointDetailDataState);

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
          {pointDetailData.histories[index].name}
        </TextBox>
        <TextBox typography="body2" color={'black900'} fontWeight={'400'}>
          {pointDetailData.histories[index].description}
        </TextBox>
        <TextBox typography="body2" color={'black900'} fontWeight={'400'}>
          {`주문수량: ${numberFormat(
            pointDetailData.histories[index].trade,
          )}매`}
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
