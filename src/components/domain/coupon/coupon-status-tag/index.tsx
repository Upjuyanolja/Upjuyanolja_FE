import styled from 'styled-components';
import { CouponTagProps, StyledCouponTagProps } from './type';
import { colors } from '@/constants/colors';
import { TextBox } from '@components/atom/text-box';
import {
  COUPON_STATUS_DISABLE,
  COUPON_STATUS_ENABLE,
  COUPON_STATUS_SOLD_OUT,
} from '@/constants/coupon';

export const CouponStatusTag = ({ status }: CouponTagProps) => {
  let borderColor = '';
  let backgroundColor = colors.primary;
  let color = colors.white;
  let text: string = COUPON_STATUS_ENABLE.label;

  if (status === COUPON_STATUS_SOLD_OUT.value) {
    borderColor = colors.orange;
    backgroundColor = colors.white;
    color = colors.orange;
    text = COUPON_STATUS_SOLD_OUT.label;
  }

  if (status === COUPON_STATUS_DISABLE.value) {
    backgroundColor = colors.black600;
    text = COUPON_STATUS_DISABLE.label;
  }
  return (
    <StyledLayout
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      color={color}
    >
      <TextBox typography="body2" fontWeight={700} data-testid="coupon-status">
        {text}
      </TextBox>
    </StyledLayout>
  );
};

const StyledLayout = styled.div<StyledCouponTagProps>`
  width: 75px;
  height: 28px;

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.borderColor || ''};
  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
