import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { useState } from 'react';
import styled from 'styled-components';
import { StyledDiscountButtonProps } from './type';
import { Input } from 'antd';

export const CouponType = () => {
  const [selectedButton, setSelectedButton] = useState('discountPrice');

  const handleButtonClick = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  return (
    <Container>
      <StyledButtonWrap>
        <StyledDiscountButton
          onClick={() => handleButtonClick('discountPrice')}
          className={`price ${
            selectedButton === 'discountPrice' ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={selectedButton === 'discountPrice' ? 'primary' : 'black900'}
          >
            할인가(원)
          </TextBox>
        </StyledDiscountButton>
        <StyledDiscountButton
          onClick={() => handleButtonClick('discountRate')}
          className={`rate ${
            selectedButton === 'discountRate' ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={selectedButton === 'discountRate' ? 'primary' : 'black900'}
          >
            할인율(%)
          </TextBox>
        </StyledDiscountButton>
      </StyledButtonWrap>
      <StyledInputWrap>
        <StyledInput />
        <TextBox typography="body2" fontWeight="bold">
          {selectedButton === 'discountPrice' ? '원 할인' : '% 할인'}
        </TextBox>
      </StyledInputWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 32px;
`;

const StyledButtonWrap = styled.div`
  display: flex;
`;

const StyledDiscountButton = styled.button<StyledDiscountButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 46px;
  border: 2px solid ${colors.black500};
  background-color: transparent;
  &.price {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &.rate {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.active {
    color: ${colors.primary};
    background: linear-gradient(268.34deg, #e0edff 1.74%, #ffffff 120.49%);
    border-color: ${colors.primary};
    font-weight: bold;
  }
`;

const StyledInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledInput = styled(Input)`
  width: 160px;
`;
