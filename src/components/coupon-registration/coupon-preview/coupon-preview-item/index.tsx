import { colors } from '@/constants/colors';
import { Spacing } from '@components/spacing';
import { TextBox } from '@components/text-box';
import { Divider } from 'antd';
import styled from 'styled-components';
import { CouponPreviewItemProps } from './type';

export const CouponPreviewItem = ({ data }: CouponPreviewItemProps) => {
  return (
    <Container>
      <TextBox typography="h5" fontWeight="bold" color="black900">
        {data.roomName}
      </TextBox>
      <Spacing space="4" />
      <TextBox typography="body2" color="black900">
        {data.couponName}
      </TextBox>
      <Spacing space="16" />
      <StyledCouponInfo>
        <StyledCouponInfoItemWrap>
          <TextBox typography="body2" fontWeight="bold" color="primary">
            장당
          </TextBox>
          <TextBox typography="body2" fontWeight="bold" color="primary">
            {data.couponPrice}P
          </TextBox>
        </StyledCouponInfoItemWrap>
        <StyledCouponInfoItemWrap>
          <TextBox typography="body2" fontWeight="bold" color="primary">
            수량
          </TextBox>
          <TextBox typography="body2" fontWeight="bold" color="primary">
            {data.couponAmount}장
          </TextBox>
        </StyledCouponInfoItemWrap>
      </StyledCouponInfo>
      <StyledDivider />
      <StyledCouponPrice>
        <TextBox typography="h5" fontWeight="bold" color="black900">
          {data.couponPrice * data.couponAmount}P
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
