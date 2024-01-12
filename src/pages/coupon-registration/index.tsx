import { CouponApplier } from '@components/coupon-registration/coupon-applier';
import { CouponCard } from '@components/coupon-registration/coupon-card';
import { CouponPreview } from '@components/coupon-registration/coupon-preview';
import { CouponType } from '@components/coupon-registration/coupon-type';
import { Spacing } from '@components/spacing';
import { TextBox } from '@components/text-box';
import { useState } from 'react';
import styled from 'styled-components';
import { DISCOUNT_PRICE_TYPE } from '@/constants/coupon-registration';
import {
  DiscountPriceType,
  DiscountRateType,
} from '@/constants/coupon-registration/type';

export const CouponRegistration = () => {
  const [selectedDiscountType, setSelectedDiscountType] = useState<
    DiscountPriceType | DiscountRateType
  >(DISCOUNT_PRICE_TYPE);
  const [discountValue, setDiscountValue] = useState<string>('');
  const [allQuantityValue, setAllQuantityValue] = useState('0');
  const [itemQuantityValue, setItemQuantityValue] = useState<
    {
      roomId: number;
      roomName: string;
      quantity: string;
    }[]
  >([]);

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
              selectedDiscountType={selectedDiscountType}
              setSelectedDiscountType={setSelectedDiscountType}
              discountValue={discountValue}
              setDiscountValue={setDiscountValue}
            />
          </CouponCard>
          <Spacing space="32" />
          <CouponCard title="2. 적용 객실 선택">
            <CouponApplier
              allQuantityValue={allQuantityValue}
              setAllQuantityValue={setAllQuantityValue}
              itemQuantityValue={itemQuantityValue}
              setItemQuantityValue={setItemQuantityValue}
            />
          </CouponCard>
        </StyledCouponCardWrap>
      </StyledLeftWrap>
      <div>
        <CouponPreview />
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
