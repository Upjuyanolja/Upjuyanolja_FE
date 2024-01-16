import { colors } from '@/constants/colors';
import { Spacing } from '@components/spacing';
import { TextBox } from '@components/text-box';
import { Divider } from 'antd';
import styled from 'styled-components';
import { CouponPreviewItemProps } from './type';
import { numberFormat } from '@/utils/Format/numberFormat';
import { useRecoilValue } from 'recoil';
import {
  determinedPriceState,
  selectedDiscountTypeState,
} from '@stores/coupon-registration/atoms';
import {
  FLAT_DISCOUNT_TYPE,
  RATE_DISCOUNT_TYPE,
} from '@/constants/coupon-registration';

export const CouponPreviewItem = ({
  roomName,
  eachPrice,
  quantity,
}: CouponPreviewItemProps) => {
  const selectedDiscountType = useRecoilValue(selectedDiscountTypeState);
  const determinedPrice = useRecoilValue(determinedPriceState);

  return (
    <Container>
      <TextBox typography="h5" fontWeight="bold" color="black900">
        {roomName}
      </TextBox>
      <Spacing space="4" />
      <TextBox typography="body2" color="black900">
        {selectedDiscountType === FLAT_DISCOUNT_TYPE &&
          `${determinedPrice ? determinedPrice : '0'}원 할인`}
        {selectedDiscountType === RATE_DISCOUNT_TYPE &&
          `${determinedPrice ? determinedPrice : '0'}% 할인 (${eachPrice})`}
      </TextBox>
      <Spacing space="16" />
      <StyledCouponInfo>
        <StyledCouponInfoItemWrap>
          <TextBox typography="body2" fontWeight="bold" color="primary">
            장당
          </TextBox>
          <TextBox typography="body2" fontWeight="bold" color="primary">
            {determinedPrice
              ? numberFormat(parseInt(determinedPrice) * 100)
              : 0}{' '}
            P
          </TextBox>
        </StyledCouponInfoItemWrap>
        <StyledCouponInfoItemWrap>
          <TextBox typography="body2" fontWeight="bold" color="primary">
            수량
          </TextBox>
          <TextBox typography="body2" fontWeight="bold" color="primary">
            {quantity}장
          </TextBox>
        </StyledCouponInfoItemWrap>
      </StyledCouponInfo>
      <StyledDivider />
      <StyledCouponPrice>
        <TextBox typography="h5" fontWeight="bold" color="black900">
          {quantity && determinedPrice
            ? `${numberFormat(parseInt(determinedPrice) * 100 * quantity)} P`
            : '0 P'}
        </TextBox>
      </StyledCouponPrice>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 12px;
  border-bottom: 12px solid ${colors.white200};
  max-height: 80vh;
`;

const StyledCouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 8px;
  gap: 4px;
  background-color: ${colors.white200};
`;

const StyledCouponInfoItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDivider = styled(Divider)`
  margin: 8px 0 0 0;
  color: ${colors.black600};
`;

const StyledCouponPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
