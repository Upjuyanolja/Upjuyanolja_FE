import { CouponCard } from '@components/coupon-registration/coupon-card';
import { CouponType } from '@components/coupon-registration/coupon-type';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';

export const CouponRegistration = () => {
  return (
    <Container>
      <TextBox typography="h4" fontWeight="bold">
        쿠폰 만들기
      </TextBox>
      <CouponCard title="1. 쿠폰 유형 선택">
        <CouponType />
      </CouponCard>
    </Container>
  );
};

const Container = styled.section`
  margin: 32px 0 0 48px;
`;
