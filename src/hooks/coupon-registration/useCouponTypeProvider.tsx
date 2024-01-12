import {
  DISCOUNT_PRICE,
  DISCOUNT_PRICE_TYPE,
  DISCOUNT_RATE,
  DISCOUNT_RATE_TYPE,
} from '@/constants/coupon-registration';
import {
  DiscountPriceType,
  DiscountRateType,
} from '@/constants/coupon-registration/type';
import { numberFormat, removeNumberFormat } from '@/utils/Format/numberFormat';
import { useEffect, useState } from 'react';

export const useCouponTypeProvider = () => {
  const [selectedDiscountType, setSelectedDiscountType] = useState<
    DiscountPriceType | DiscountRateType
  >(DISCOUNT_PRICE_TYPE);
  const [errorMessage, setErrorMessage] = useState('');
  const [discountValue, setDiscountValue] = useState<string>('');
  const [isValidDiscountRange, setIsValidDiscountRange] = useState(true);

  useEffect(() => {
    setDiscountValue('');
    setErrorMessage('');
  }, [selectedDiscountType]);

  useEffect(() => {
    if (!discountValue) {
      return setIsValidDiscountRange(true);
    }

    checkDiscountValidity(discountValue, selectedDiscountType);
  }, [discountValue]);

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
    const removeFormattedValue = removeNumberFormat(discountValue);
    const formattedValue = numberFormat(removeFormattedValue);
    await setDiscountValue(formattedValue);
  };

  const handleFocus = (discountValue: string) => {
    const removeFormattedValue = removeNumberFormat(discountValue);
    setDiscountValue(removeFormattedValue);
  };

  const handleErrorDisplay = (
    discountType: DiscountPriceType | DiscountRateType,
  ) => {
    setErrorMessage(discountType.errorMessage);
    setIsValidDiscountRange(false);
  };

  const handleDiscountErrorMessage = (
    discountValue: string,
    discountType: DiscountPriceType | DiscountRateType,
  ) => {
    if (
      parseInt(discountValue) < discountType.min ||
      parseInt(discountValue) > discountType.max
    ) {
      setErrorMessage(discountType.errorMessage);
    } else {
      setErrorMessage('');
    }
  };

  const handleDiscountType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedButtonClassName = e.currentTarget.className;
    const newDiscountType = clickedButtonClassName.includes('price')
      ? DISCOUNT_PRICE_TYPE
      : DISCOUNT_RATE_TYPE;

    setSelectedDiscountType(newDiscountType);
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
      e.currentTarget.blur();
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
    handleFocus,
  };
};
