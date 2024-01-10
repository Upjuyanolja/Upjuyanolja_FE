import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledDiscountButtonProps } from './type';
import { Input } from 'antd';
import { numberFormat } from '@/utils/Format/numberFormat';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const CouponType = () => {
  const DISCOUNT_PRICE = 'price';
  const DISCOUNT_RATE = 'percent';

  const [selectedButton, setSelectedButton] = useState(DISCOUNT_PRICE);
  const [discountValue, setDiscountValue] = useState('');
  const navigate = useNavigate();
  const { percent } = useParams();

  const handleButtonClick = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  useEffect(() => {
    if (selectedButton === DISCOUNT_PRICE) {
      navigate(ROUTES.COUPON_REGISTRATION);
    }
    if (selectedButton === DISCOUNT_RATE) {
      navigate(`${ROUTES.COUPON_REGISTRATION}/percent`);
    }
  }, [selectedButton]);

  useEffect(() => {
    if (!percent) {
      return;
    }
    console.log('퍼센트');
  }, [percent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountValue(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!discountValue) {
      return;
    }
    setDiscountValue(numberFormat(e.target.value));
  };

  return (
    <Container>
      <StyledButtonWrap>
        <StyledDiscountButton
          onClick={() => handleButtonClick(DISCOUNT_PRICE)}
          className={`price ${
            selectedButton === DISCOUNT_PRICE ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={selectedButton === DISCOUNT_PRICE ? 'primary' : 'black900'}
          >
            할인가(원)
          </TextBox>
        </StyledDiscountButton>
        <StyledDiscountButton
          onClick={() => handleButtonClick(DISCOUNT_RATE)}
          className={`rate ${
            selectedButton === DISCOUNT_RATE ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={selectedButton === DISCOUNT_RATE ? 'primary' : 'black900'}
          >
            할인율(%)
          </TextBox>
        </StyledDiscountButton>
      </StyledButtonWrap>
      <StyledInputWrap>
        <StyledInput
          onChange={handleChange}
          value={discountValue}
          onBlur={handleBlur}
        />
        <StyledTextWrap>
          <TextBox typography="body2" fontWeight="bold">
            {selectedButton === DISCOUNT_PRICE ? '원 할인' : '% 할인'}
          </TextBox>
        </StyledTextWrap>
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
  height: 40px;
`;

const StyledTextWrap = styled.div`
  width: 47px;
`;
