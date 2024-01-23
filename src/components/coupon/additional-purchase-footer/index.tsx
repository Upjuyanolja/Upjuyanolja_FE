import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Button, Checkbox } from 'antd';
import styled from 'styled-components';
import { PurchaseFooterProps } from './type';
import { useState } from 'react';
import { CouponAgreementModal } from '@components/agreement-modal/coupon-agreement-modal';

export const AdditionalPurchaseFooter = ({
  totalPoints,
  handlePurchaseButton,
  handleAgreeCheckbox,
  isAgreed,
}: PurchaseFooterProps) => {
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);

  const handleAgreementModalOpen = () => {
    setIsAgreementModalOpen(true);
  };

  return (
    <>
      <StyledTotalPriceContainer>
        <TextBox typography="h5" fontWeight={700} color="primary">
          합계 : {totalPoints?.toLocaleString()}P
        </TextBox>
      </StyledTotalPriceContainer>
      <StyledCheckBoxContainer>
        <Checkbox onChange={handleAgreeCheckbox} checked={isAgreed} />
        <TextBox typography="body3" fontWeight={400}>
          주문 내용을 확인하였으며,
        </TextBox>
        <TextBox
          typography="body3"
          fontWeight={400}
          color="primary"
          cursor={'pointer'}
          onClick={handleAgreementModalOpen}
        >
          구매 약관
        </TextBox>
        <TextBox typography="body3" fontWeight={400}>
          등에 동의합니다
        </TextBox>
      </StyledCheckBoxContainer>

      <StyledButton
        type="primary"
        size="large"
        disabled={!isAgreed}
        onClick={handlePurchaseButton}
      >
        <TextBox fontWeight={700} typography="h5">
          구매하기
        </TextBox>
      </StyledButton>
      <CouponAgreementModal
        isModalOpen={isAgreementModalOpen}
        setIsModalOpen={setIsAgreementModalOpen}
      />
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
