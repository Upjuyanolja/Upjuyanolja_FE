import { Space } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/atom/text-box';
import { pointDetailDataState } from '@stores/point-detail/atoms';
import { useRecoilValue } from 'recoil';
import { numberFormat } from '@/utils/formatiing/numberFormat';

export const CouponInfo = ({ index }: { index: number }) => {
  const pointDetailData = useRecoilValue(pointDetailDataState);

  return (
    <CouponInfoWrap direction="vertical">
      <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
        결제 쿠폰
      </TextBox>
      {pointDetailData.histories[index].receipt.orders?.map(
        (order, orderIndex) => (
          <CouponDetailBox key={orderIndex}>
            <TextBox
              typography="body2"
              color={'black900'}
              fontWeight={'700'}
              className="couponDetail-title"
            >
              {order.room}
            </TextBox>

            {order.coupons?.map((coupon, couponIndex) => (
              <FlexBox key={couponIndex}>
                <div>
                  <TextBox
                    typography="body2"
                    color={'primary'}
                    fontWeight={'700'}
                  >
                    {coupon.name.split(' | ')[0]}
                  </TextBox>
                  <TextBox
                    typography="body2"
                    color={'black900'}
                    fontWeight={'400'}
                  >
                    {' | ' + numberFormat(coupon.name.split('|')[1])}P
                  </TextBox>
                </div>
                <FlexBox>
                  <div>
                    <TextBox
                      typography="body2"
                      color={'black900'}
                      fontWeight={'400'}
                    >
                      {numberFormat(coupon.count)}장
                    </TextBox>
                  </div>
                  <div className="margin-left">
                    <TextBox
                      typography="h5"
                      color={'black900'}
                      fontWeight={'700'}
                    >
                      {numberFormat(coupon.totalPrice)}P
                    </TextBox>
                  </div>
                </FlexBox>
              </FlexBox>
            ))}
          </CouponDetailBox>
        ),
      )}
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
const FlexBox = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .margin-left {
    margin-left: 60px;
  }
`;
