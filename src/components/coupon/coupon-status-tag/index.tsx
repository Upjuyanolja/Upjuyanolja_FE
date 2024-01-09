import styled from 'styled-components';
import { CouponTagProps, StyledCouponTagProps } from './type';
import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';

export const CouponStatusTag = ({ status }: CouponTagProps) => {
  let borderColor = '';
  let backgroundColor = colors.primary;
  let color = colors.white;
  if (status === '소진') {
    borderColor = colors.orange;
    backgroundColor = colors.white;
    color = colors.orange;
  }
  if (status === '발급 중지') {
    backgroundColor = colors.black600;
  }
  return (
    <StyledLayout
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      color={color}
    >
      <TextBox typography="body2" fontWeight={700}>
        {status}
      </TextBox>
    </StyledLayout>
  );
};

const StyledLayout = styled.div<StyledCouponTagProps>`
  width: 75px;
  height: 28px;

  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.borderColor || ''};
  color: ${(props) => props.color};

  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
