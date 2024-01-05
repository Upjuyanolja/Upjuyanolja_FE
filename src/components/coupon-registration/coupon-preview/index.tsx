import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { CouponPreviewItem } from './coupoin-preview-item';

const couponMap = {
  label: '5000원 할인 쿠폰',
  coupons: [
    {
      roomName: '스탠다드 트윈',
      couponName: '5000원 할인',
      couponPrice: 500,
      couponAmount: 20,
    },
    {
      roomName: '디럭스 더블',
      couponName: '5000원 할인',
      couponPrice: 500,
      couponAmount: 20,
    },
  ],
};

export const CouponPreview = () => {
  return (
    <Container>
      <TextBox typography="h4" fontWeight="bold" color="black900">
        쿠폰 만들기
      </TextBox>
      <StyledCouponWrap>
        <StyledTitleWrap>
          <TextBox typography="h4" fontWeight="bold" color="primary">
            {couponMap.label}
          </TextBox>
        </StyledTitleWrap>
        <StyledCouponItemWrap>
          {couponMap.coupons.map((item, index) => (
            <CouponPreviewItem data={item} key={index} />
          ))}
        </StyledCouponItemWrap>
      </StyledCouponWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const StyledCouponWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 324px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  overflow: hidden;
`;

const StyledTitleWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
  width: 100%;
  background-color: ${colors.light};
`;

const StyledCouponItemWrap = styled.div``;
