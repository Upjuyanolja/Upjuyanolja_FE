import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { Input } from 'antd';
import { Spacing } from '@components/spacing';
import {
  FLAT_DISCOUNT,
  FLAT_DISCOUNT_TYPE,
  RATE_DISCOUNT,
  RATE_DISCOUNT_TYPE,
} from '@/constants/coupon-registration';
import { useEffect, useState } from 'react';
import { numberFormat, removeNumberFormat } from '@/utils/format/numberFormat';
import { InputChangeEvent, MouseEvent } from '@/types/event';
import { isNumber } from '@/utils/is-number';
import { handleEnterKeyDown } from '@/utils/keydown/handleEnterKeyDown';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  determinedPriceState,
  discountValueState,
  isTermsCheckedState,
  selectedDiscountTypeState,
} from '@stores/coupon-registration/atoms';
import {
  FlatDiscountType,
  RateDiscountType,
} from '@/constants/coupon-registration/type';

export const DiscountType = () => {
  const [isValidDiscountRange, setIsValidDiscountRange] = useState(true);
  const [selectedDiscountType, setSelectedDiscountType] = useRecoilState(
    selectedDiscountTypeState,
  );
  const [discountValue, setDiscountValue] = useRecoilState(discountValueState);
  const setDeterminedPrice = useSetRecoilState(determinedPriceState);
  const setIsTermsChecked = useSetRecoilState(isTermsCheckedState);

  useEffect(() => {
    resetStateValues();
  }, [selectedDiscountType]);

  useEffect(() => {
    if (!discountValue) {
      return setIsValidDiscountRange(true);
    }

    checkDiscountValidity(discountValue, selectedDiscountType);
  }, [discountValue]);

  const resetStateValues = () => {
    setDiscountValue('');
    setDeterminedPrice('');
    setIsTermsChecked(false);
  };

  const handleBlur = (
    discountValue: string,
    discountType: FlatDiscountType | RateDiscountType,
  ) => {
    if (!discountValue) {
      setDeterminedPrice('');
      return;
    }

    checkDiscountValidity(discountValue, discountType);
    normalizeToRange(discountValue, discountType);

    let transformedValue;

    if (parseInt(discountValue) >= FLAT_DISCOUNT_TYPE.min) {
      transformedValue = (
        Math.floor(parseInt(discountValue) / FLAT_DISCOUNT_TYPE.min) *
        FLAT_DISCOUNT_TYPE.min
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
    discountType: FlatDiscountType | RateDiscountType,
  ) => {
    if (parseInt(discountValue) > discountType.max) {
      const transformedValue = discountType.max.toString();
      setDiscountValue(transformedValue);
      formattedNumber(transformedValue);
    }

    if (parseInt(discountValue) < discountType.min) {
      const transformedValue = discountType.min.toString();
      setDiscountValue(transformedValue);
      formattedNumber(transformedValue);
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

  const handleDiscountType = (e: MouseEvent) => {
    const clickedButtonClassName = e.currentTarget.className;
    const newDiscountType = clickedButtonClassName.includes('price')
      ? FLAT_DISCOUNT_TYPE
      : RATE_DISCOUNT_TYPE;

    setSelectedDiscountType(newDiscountType);
  };

  const handleDiscountInputChange = (e: InputChangeEvent) => {
    const inputValue = e.target.value;
    if (isNumber(inputValue)) {
      setDiscountValue(inputValue);
    }
    if (!isNumber(inputValue) && inputValue.length < 1) {
      setDiscountValue('');
    }
  };

  const checkDiscountValidity = (
    discountValue: string,
    discountType: FlatDiscountType | RateDiscountType,
  ) => {
    const numericDiscountValue = parseInt(removeNumberFormat(discountValue));

    if (
      numericDiscountValue < discountType.min ||
      numericDiscountValue > discountType.max
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
          onClick={(e) => handleDiscountType(e)}
          className={`price ${
            selectedDiscountType.typeName === FLAT_DISCOUNT ? 'active' : null
          }`}
          type="button"
        >
          <TextBox
            typography="h5"
            color={
              selectedDiscountType.typeName === FLAT_DISCOUNT
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
            selectedDiscountType.typeName === RATE_DISCOUNT ? 'active' : null
          }`}
          type="button"
        >
          <TextBox
            typography="h5"
            color={
              selectedDiscountType.typeName === RATE_DISCOUNT
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
          maxLength={5}
          onBlur={() => handleBlur(discountValue, selectedDiscountType)}
          onFocus={() => handleFocus(discountValue)}
          placeholder={
            selectedDiscountType.typeName === FLAT_DISCOUNT
              ? '1,000~50,000 까지'
              : '1~50까지'
          }
          status={isValidDiscountRange ? '' : 'error'}
          onKeyDown={handleEnterKeyDown}
        />
        <StyledTextWrap>
          <TextBox typography="body2" fontWeight="bold">
            {selectedDiscountType.typeName === FLAT_DISCOUNT
              ? '원 할인'
              : '% 할인'}
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
  cursor: pointer;
  &.price {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-width: 2px 0px 2px 2px;
  }
  &.rate {
    border-width: 2px 2px 2px 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.active {
    border-width: 2px;
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
