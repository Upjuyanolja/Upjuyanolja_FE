import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { StyledDiscountButtonProps } from './type';
import { Input } from 'antd';
import { useCouponTypeProvider } from '@hooks/coupon-registration/useCouponTypeProvider';
import { Spacing } from '@components/spacing';

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
    handleEnterKeyDown,
    handleFocus,
  } = useCouponTypeProvider();

  return (
    <Container>
      <StyledButtonWrap>
        <StyledDiscountButton
          onClick={(e) => handleDiscountType(e)}
          className={`price ${
            selectedDiscountType.typeName === DISCOUNT_PRICE ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={
              selectedDiscountType.typeName === DISCOUNT_PRICE
                ? 'primary'
                : 'black900'
            }
          >
            할인가(원)
          </TextBox>
        </StyledDiscountButton>
        <StyledDiscountButton
          onClick={(e) => handleDiscountType(e)}
          className={`rate ${
            selectedDiscountType.typeName === DISCOUNT_RATE ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={
              selectedDiscountType.typeName === DISCOUNT_RATE
                ? 'primary'
                : 'black900'
            }
          >
            할인율(%)
          </TextBox>
        </StyledDiscountButton>
      </StyledButtonWrap>
      <Spacing space="32" />
      <StyledInputWrap>
        <StyledInput
          onChange={handleDiscountInputChange}
          value={discountValue || ''}
          onBlur={() => handleBlur(discountValue, selectedDiscountType)}
          onFocus={() => handleFocus(discountValue)}
          placeholder={
            selectedDiscountType.typeName === DISCOUNT_PRICE
              ? '1,000~50,000 까지'
              : '1~50까지'
          }
          status={isValidDiscountRange ? '' : 'error'}
          onKeyDown={handleEnterKeyDown}
        />
        <StyledTextWrap>
          <TextBox typography="body2" fontWeight="bold">
            {selectedDiscountType.typeName === DISCOUNT_PRICE
              ? '원 할인'
              : '% 할인'}
          </TextBox>
        </StyledTextWrap>
      </StyledInputWrap>
      <StyledErrorMessage>
        <Spacing space="4" />
        <TextBox typography="body4" color="error">
          {errorMessage ? errorMessage : null}
        </TextBox>
      </StyledErrorMessage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

const StyledErrorMessage = styled.div``;
