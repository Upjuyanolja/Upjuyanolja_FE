import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Button, Checkbox } from 'antd';
import styled from 'styled-components';

export const AdditionalPurchaseFooter = () => {
  return (
    <>
      <StyledTotalPriceContainer>
        <TextBox typography="h5" fontWeight={700} color="primary">
          합계 : 36,000P
        </TextBox>
      </StyledTotalPriceContainer>
      <StyledCheckBoxContainer>
        <Checkbox />
        <TextBox typography="body3" fontWeight={400}>
          주문 내용을 확인하였으며,
        </TextBox>
        <TextBox typography="body3" fontWeight={400} color="primary">
          구매 약관
        </TextBox>
        <TextBox typography="body3" fontWeight={400}>
          등에 동의합니다
        </TextBox>
      </StyledCheckBoxContainer>

      <StyledButton type="primary" size="large">
        <TextBox fontWeight={700} typography="h5">
          구매하기
        </TextBox>
      </StyledButton>
    </>
  );
};

const StyledTotalPriceContainer = styled.div`
  padding: 4px 16px;
  border: 2px solid ${colors.primary};
  background: linear-gradient(
    268deg,
    ${colors.light} 1.74%,
    ${colors.white} 120.49%
  );
`;

const StyledCheckBoxContainer = styled.div`
  margin: 16px 0 8px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  .ant-checkbox-inner {
    border: 1px solid ${colors.primary};
  }
  .ant-checkbox-wrapper {
    margin-right: 6px;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
