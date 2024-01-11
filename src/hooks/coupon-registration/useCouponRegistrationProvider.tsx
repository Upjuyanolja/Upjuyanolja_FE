import {
  DISCOUNT_PRICE,
  DISCOUNT_PRICE_TYPE,
  DISCOUNT_RATE,
} from '@/constants/coupon-registration';
import {
  DiscountPriceType,
  DiscountRateType,
} from '@/constants/coupon-registration/type';
import { numberFormat, removeNumberFormat } from '@/utils/Format/numberFormat';
import { useEffect, useState } from 'react';

export const useCouponRegistrationProvider = () => {
  const [selectedDiscountType, setSelectedDiscountType] = useState<
    DiscountPriceType | DiscountRateType
  >(DISCOUNT_PRICE_TYPE);
  const [errorMessage, setErrorMessage] = useState('');
  const [discountValue, setDiscountValue] = useState<string>('');
  const [isValidDiscountRange, setIsValidDiscountRange] = useState(true);

  // 할인 쿠폰 타입 선택
  useEffect(() => {
    setDiscountValue('');
    setErrorMessage('');
  }, [selectedDiscountType]);

  // 할인가 변경
  useEffect(() => {
    if (!discountValue) {
      return setIsValidDiscountRange(true);
    }

    checkDiscountValidity(discountValue, selectedDiscountType);
  }, [discountValue]);

  // input blur 시 실행되는 함수
  const handleBlur = async (
    discountValue: string,
    discountType: DiscountPriceType | DiscountRateType,
  ) => {
    if (!discountValue) {
      return;
    }

    if (!isNumberDiscountValue(discountValue)) {
      return handleErrorDisplay(discountType);
    }

    await handleDiscountErrorMessage(discountValue, discountType);
    await checkDiscountValidity(discountValue, discountType);
    const formattedValue = numberFormat(discountValue);
    await setDiscountValue(formattedValue);
  };

  const handleErrorDisplay = (
    discountType: DiscountPriceType | DiscountRateType,
  ) => {
    setErrorMessage(discountType.errorMessage);
    setIsValidDiscountRange(false);
  };

  // 할인가 유효성 검사 후 에러메시지 핸들링 함수
  const handleDiscountErrorMessage = (
    discountValue: string,
    type: DiscountPriceType | DiscountRateType,
  ) => {
    if (
      parseInt(discountValue) < type.min ||
      parseInt(discountValue) > type.max
    ) {
      setErrorMessage(type.errorMessage);
    } else {
      setErrorMessage('');
    }
  };

  const handleDiscountType = (type: DiscountPriceType | DiscountRateType) => {
    setSelectedDiscountType(type);
  };

  const handleDiscountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDiscountValue(e.target.value);
  };

  const checkDiscountValidity = (
    discountValue: string,
    discountType: DiscountPriceType | DiscountRateType,
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

  const isNumberDiscountValue = (discountValue: string) => {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(discountValue);
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur(discountValue, selectedDiscountType);
    }
  };

  return {
    DISCOUNT_PRICE,
    DISCOUNT_RATE,
    selectedDiscountType,
    errorMessage,
    discountValue,
    setDiscountValue,
    handleDiscountType,
    handleDiscountInputChange,
    isValidDiscountRange,
    handleBlur,
    handleEnterKeyDown,
  };
};
