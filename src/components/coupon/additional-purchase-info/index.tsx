import { TextBox } from '@components/text-box';
import { Input } from 'antd';
import styled from 'styled-components';
import { PurchaseInfoProps } from './type';

export const AdditionalPurchaseInfo = ({ coupon }: PurchaseInfoProps) => {
  return (
    <StyledCouponInfo>
      <TextBox typography="body2" fontWeight={400}>
        {coupon.name} | {coupon.points.toLocaleString()}P
      </TextBox>
      <StyledPriceInfo>
        <div>
          <StyledInput value={coupon.numberOfCoupons} />
          <TextBox fontWeight={400} typography="body3">
            장
          </TextBox>
        </div>
        <TextBox typography="h5" fontWeight={700}>
          {coupon.totalPoints.toLocaleString()}P
        </TextBox>
      </StyledPriceInfo>
    </StyledCouponInfo>
  );
};

const StyledCouponInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledPriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const StyledInput = styled(Input)`
  width: 56px;
  height: 26px;

  margin-right: 4px;
`;
