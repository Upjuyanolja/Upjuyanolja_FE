import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { StyledDiscountButtonProps } from './type';
import { Input } from 'antd';
import { useCouponRegistrationProvider } from '@hooks/coupon-registration/useCouponRegistrationProvider';

export const CouponType = () => {
  const {
    DISCOUNT_PRICE,
    DISCOUNT_RATE,
    selectedDiscountType,
    errorMessage,
    discountValue,
    handleDiscountType,
    handleDiscountInputChange,
    isValidDiscountRange,
    handleBlur,
  } = useCouponRegistrationProvider();

  return (
    <Container>
      <StyledButtonWrap>
        <StyledDiscountButton
          onClick={() => handleDiscountType(DISCOUNT_PRICE)}
          className={`price ${
            selectedDiscountType === DISCOUNT_PRICE ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={
              selectedDiscountType === DISCOUNT_PRICE ? 'primary' : 'black900'
            }
          >
            할인가(원)
          </TextBox>
        </StyledDiscountButton>
        <StyledDiscountButton
          onClick={() => handleDiscountType(DISCOUNT_RATE)}
          className={`rate ${
            selectedDiscountType === DISCOUNT_RATE ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={
              selectedDiscountType === DISCOUNT_RATE ? 'primary' : 'black900'
            }
          >
            할인율(%)
          </TextBox>
        </StyledDiscountButton>
      </StyledButtonWrap>
      <StyledInputWrap>
        <StyledInput
          onChange={handleDiscountInputChange}
          value={discountValue || ''}
          onBlur={() => handleBlur(discountValue)}
          placeholder={
            selectedDiscountType === DISCOUNT_PRICE
              ? '1,000~50,000 까지'
              : '1~50까지'
          }
          status={isValidDiscountRange ? '' : 'error'}
        />
        <StyledTextWrap>
          <TextBox typography="body2" fontWeight="bold">
            {selectedDiscountType === DISCOUNT_PRICE ? '원 할인' : '% 할인'}
          </TextBox>
        </StyledTextWrap>
      </StyledInputWrap>
      <p>{errorMessage ? errorMessage : null}</p>
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
