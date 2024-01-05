import { CouponApplier } from '@components/coupon-registration/coupon-applier';
import { CouponCard } from '@components/coupon-registration/coupon-card';
import { CouponType } from '@components/coupon-registration/coupon-type';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { SpacingProps } from './type';

export const CouponRegistration = () => {
  return (
    <Container>
      <TextBox typography="h4" fontWeight="bold">
        쿠폰 만들기
      </TextBox>
      <Spacing space="8" />
      <CouponCard title="1. 쿠폰 유형 선택">
        <CouponType />
      </CouponCard>
      <Spacing space="32" />
      <CouponCard title="2. 적용 객실 선택">
        <CouponApplier />
      </CouponCard>
    </Container>
  );
};

const Container = styled.section`
  margin: 32px 0 0 48px;
`;

const Spacing = styled.div<SpacingProps>`
  height: ${(props) => props.space}px;
`;
