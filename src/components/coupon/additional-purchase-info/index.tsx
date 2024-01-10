import { TextBox } from '@components/text-box';
import { Input } from 'antd';
import styled from 'styled-components';

export const AdditionalPurchaseInfo = () => {
  return (
    <StyledCouponInfo>
      <TextBox typography="body2" fontWeight={400}>
        10% 쿠폰 | 100P
      </TextBox>
      <StyledPriceInfo>
        <div>
          <StyledInput />
          <TextBox fontWeight={400} typography="body3">
            장
          </TextBox>
        </div>
        <TextBox typography="h5" fontWeight={700}>
          10,0000P
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
