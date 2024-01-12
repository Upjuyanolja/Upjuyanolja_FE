import { CouponApplier } from '@components/coupon-registration/coupon-applier';
import { CouponCard } from '@components/coupon-registration/coupon-card';
import { CouponPreview } from '@components/coupon-registration/coupon-preview';
import { CouponType } from '@components/coupon-registration/coupon-type';
import { Spacing } from '@components/spacing';
import { TextBox } from '@components/text-box';
import { useState } from 'react';
import styled from 'styled-components';
import { FLAT_COUPON_TYPE } from '@/constants/coupon-registration';
import {
  FlatCouponType,
  RateCouponType,
} from '@/constants/coupon-registration/type';
import { PendingCouponDataList } from '@components/coupon-registration/type';

export const CouponRegistration = () => {
  const [selectedCouponType, setSelectedCouponType] = useState<
    FlatCouponType | RateCouponType
  >(FLAT_COUPON_TYPE);
  const [discountValue, setDiscountValue] = useState('');
  const [determinedPrice, setDeterminedPrice] = useState('');
  const [pendingCouponData, setPendingCouponDataList] =
    useState<PendingCouponDataList>([]);

  return (
    <Container>
      <StyledLeftWrap>
        <TextBox typography="h4" fontWeight="bold">
          쿠폰 만들기
        </TextBox>
        <Spacing space="8" />
        <StyledCouponCardWrap>
          <CouponCard title="1. 쿠폰 유형 선택">
            <CouponType
              selectedCouponType={selectedCouponType}
              setSelectedCouponType={setSelectedCouponType}
              discountValue={discountValue}
              setDiscountValue={setDiscountValue}
              setPendingCouponDataList={setPendingCouponDataList}
              setDeterminedPrice={setDeterminedPrice}
            />
          </CouponCard>
          <Spacing space="32" />
          <CouponCard title="2. 적용 객실 선택">
            <CouponApplier
              selectedCouponType={selectedCouponType}
              pendingCouponData={pendingCouponData}
              setPendingCouponDataList={setPendingCouponDataList}
            />
          </CouponCard>
        </StyledCouponCardWrap>
      </StyledLeftWrap>
      <div>
        <CouponPreview
          selectedCouponType={selectedCouponType}
          determinedPrice={determinedPrice}
          pendingCouponData={pendingCouponData}
        />
      </div>
    </Container>
  );
};

const Container = styled.section`
  padding: 32px 48px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const StyledLeftWrap = styled.div`
  width: 580px;
`;

const StyledCouponCardWrap = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`;
