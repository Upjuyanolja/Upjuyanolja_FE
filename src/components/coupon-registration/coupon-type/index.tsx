import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { CouponTypeProps } from './type';
import { Input } from 'antd';
import { Spacing } from '@components/spacing';
import {
  FLAT_COUPON,
  FLAT_COUPON_TYPE,
  RATE_COUPON,
  RATE_COUPON_TYPE,
} from '@/constants/coupon-registration';
import { useEffect, useState } from 'react';
import {
  FlatCouponType,
  RateCouponType,
} from '@/constants/coupon-registration/type';
import { numberFormat, removeNumberFormat } from '@/utils/Format/numberFormat';
import { InputChangeEvent, MouseEvent } from '@/types/event';
import { isNumber } from '@/utils/is-number';
import { useCouponRegistration } from '@hooks/coupon-registration/useCouponRegistration';

export const CouponType = ({
  selectedCouponType,
  setSelectedCouponType,
  discountValue,
  setDiscountValue,
  setPendingCouponDataList,
  setDeterminedPrice,
}: CouponTypeProps) => {
  const { handleEnterKeyDown } = useCouponRegistration();
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidDiscountRange, setIsValidDiscountRange] = useState(true);

  useEffect(() => {
    initializeValue();
  }, [selectedCouponType]);

  useEffect(() => {
    if (!discountValue) {
      return setIsValidDiscountRange(true);
    }

    checkDiscountValidity(discountValue, selectedCouponType);
  }, [discountValue]);

  const initializeValue = () => {
    setDiscountValue('');
    setErrorMessage('');
    setPendingCouponDataList([
      {
        roomId: 0,
        roomName: '',
        quantity: '',
      },
    ]);
    setDeterminedPrice('');
  };

  const handleBlur = (
    discountValue: string,
    couponType: FlatCouponType | RateCouponType,
  ) => {
    if (!discountValue) {
      return;
    }

    handleDiscountErrorMessage(discountValue, couponType);
    checkDiscountValidity(discountValue, couponType);
    let transformedValue;
    normalizeToRange(discountValue, couponType);
    if (Number(discountValue) >= FLAT_COUPON_TYPE.min) {
      transformedValue = (
        Math.floor(Number(discountValue) / FLAT_COUPON_TYPE.min) *
        FLAT_COUPON_TYPE.min
      ).toString();
    } else {
      transformedValue = discountValue;
    }
    if (!isValidDiscountRange) {
      return;
    }
    formattedNumber(transformedValue);
  };

  const normalizeToRange = (
    discountValue: string,
    couponType: FlatCouponType | RateCouponType,
  ) => {
    if (parseInt(discountValue) > couponType.max) {
      const transformedValue = couponType.max.toString();
      setDiscountValue(transformedValue);
      formattedNumber(transformedValue);
      setErrorMessage(couponType.errorMessage);
    }

    if (parseInt(discountValue) < couponType.min) {
      const transformedValue = couponType.min.toString();
      setDiscountValue(transformedValue);
      formattedNumber(transformedValue);
      setErrorMessage(couponType.errorMessage);
    }
  };

  const formattedNumber = (transformedValue: string) => {
    const removeFormattedValue = removeNumberFormat(transformedValue);
    const formattedValue = numberFormat(removeFormattedValue);
    setDeterminedPrice(formattedValue);
    setDiscountValue(formattedValue);
  };

  const handleFocus = (discountValue: string) => {
    const removeFormattedValue = removeNumberFormat(discountValue);
    setDiscountValue(removeFormattedValue);
  };

  const handleDiscountErrorMessage = (
    discountValue: string,
    couponType: FlatCouponType | RateCouponType,
  ) => {
    if (
      parseInt(discountValue) < couponType.min ||
      parseInt(discountValue) > couponType.max
    ) {
      setErrorMessage(couponType.errorMessage);
    } else {
      setErrorMessage('');
    }
  };

  const handleCouponType = (e: MouseEvent) => {
    const clickedButtonClassName = e.currentTarget.className;
    const newCouponType = clickedButtonClassName.includes('price')
      ? FLAT_COUPON_TYPE
      : RATE_COUPON_TYPE;

    setSelectedCouponType(newCouponType);
  };

  const handleDiscountInputChange = (e: InputChangeEvent) => {
    if (!isNumber(e.target.value)) {
      return setDiscountValue('');
    }
    setDiscountValue(e.target.value);
  };

  const checkDiscountValidity = (
    discountValue: string,
    couponType: FlatCouponType | RateCouponType,
  ) => {
    const numericDiscountValue = parseInt(removeNumberFormat(discountValue));

    if (
      numericDiscountValue < couponType.min ||
      numericDiscountValue > couponType.max
    ) {
      setIsValidDiscountRange(false);
    } else {
      setIsValidDiscountRange(true);
    }
  };

  return (
    <Container>
      <StyledButtonWrap>
        <StyledDiscountButton
          onClick={(e) => handleCouponType(e)}
          className={`price ${
            selectedCouponType.typeName === FLAT_COUPON ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={
              selectedCouponType.typeName === FLAT_COUPON
                ? 'primary'
                : 'black900'
            }
          >
            할인가(원)
          </TextBox>
        </StyledDiscountButton>
        <StyledDiscountButton
          onClick={(e) => handleCouponType(e)}
          className={`rate ${
            selectedCouponType.typeName === RATE_COUPON ? 'active' : null
          }`}
        >
          <TextBox
            typography="h5"
            color={
              selectedCouponType.typeName === RATE_COUPON
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
          onBlur={() => handleBlur(discountValue, selectedCouponType)}
          onFocus={() => handleFocus(discountValue)}
          placeholder={
            selectedCouponType.typeName === FLAT_COUPON
              ? '1,000~50,000 까지'
              : '1~50까지'
          }
          status={isValidDiscountRange ? '' : 'error'}
          onKeyDown={handleEnterKeyDown}
        />
        <StyledTextWrap>
          <TextBox typography="body2" fontWeight="bold">
            {selectedCouponType.typeName === FLAT_COUPON ? '원 할인' : '% 할인'}
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

const StyledDiscountButton = styled.button`
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
