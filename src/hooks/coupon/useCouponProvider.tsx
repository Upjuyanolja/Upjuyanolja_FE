import {
  COUPON_ERROR_MESSAGE,
  DISCOUNT_PRICE,
  DISCOUNT_PRICE_NUM,
  DISCOUNT_RATE,
  DISCOUNT_RATE_NUM,
  DISCOUNT_VALUE_INIT,
} from '@/constants/coupon';
import { ROUTES } from '@/constants/routes';
import { numberFormat, removeNumberFormat } from '@/utils/Format/numberFormat';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const useCouponProvider = () => {
  const [selectedDiscountType, setSelectedDiscountType] =
    useState(DISCOUNT_PRICE);
  const [errorMessage, setErrorMessage] = useState('');
  const [discountValue, setDiscountValue] = useState<string>('');
  const [isValidDiscountRange, setIsValidDiscountRange] = useState(true);
  const navigate = useNavigate();
  const { percent } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (selectedDiscountType === DISCOUNT_PRICE) {
      navigate(ROUTES.COUPON_REGISTRATION);
    }
    if (selectedDiscountType === DISCOUNT_RATE) {
      navigate(`${ROUTES.COUPON_REGISTRATION}/percent`);
    }
    setDiscountValue('');
    setErrorMessage('');
  }, [selectedDiscountType]);

  useEffect(() => {
    if (searchParams.size === DISCOUNT_VALUE_INIT) {
      return;
    }

    if (percent) {
      handleDiscountRateErrorMessage(discountValue);
    } else {
      handleDiscountPriceErrorMessage(discountValue);
    }

    const searchParamsValue = searchParams.get('discount') || '';
    setDiscountValue(searchParamsValue);
  }, [searchParams]);

  useEffect(() => {
    if (!discountValue) {
      setIsValidDiscountRange(true);
      return;
    }

    if (percent) {
      checkDiscountRateValidity(discountValue);
    } else {
      checkDiscountPriceValidity(discountValue);
    }
  }, [discountValue]);

  const handleNavigate = (discountValue: string) => {
    if (percent) {
      navigate(
        `${ROUTES.COUPON_REGISTRATION}/percent?discount=${discountValue}`,
      );
    } else {
      navigate(`${ROUTES.COUPON_REGISTRATION}?discount=${discountValue}`);
    }
  };

  const handleBlur = async (discountValue: string) => {
    if (!discountValue) {
      return;
    }
    await handleNavigate(discountValue);
    const formattedValue = numberFormat(discountValue);
    await setDiscountValue(formattedValue);
  };

  const handleDiscountPriceErrorMessage = (discountValue: string) => {
    if (
      parseInt(discountValue) < DISCOUNT_PRICE_NUM.min ||
      parseInt(discountValue) > DISCOUNT_PRICE_NUM.max
    ) {
      setErrorMessage(COUPON_ERROR_MESSAGE.invalidPriceRange);
    } else {
      setErrorMessage('');
    }
  };

  const handleDiscountRateErrorMessage = (discountValue: string) => {
    if (
      parseInt(discountValue) < DISCOUNT_RATE_NUM.min ||
      parseInt(discountValue) > DISCOUNT_RATE_NUM.max
    ) {
      setErrorMessage(COUPON_ERROR_MESSAGE.invalidRateRange);
    } else {
      setErrorMessage('');
    }
  };

  const handleDiscountType = (type: string) => {
    setSelectedDiscountType(type);
  };

  const handleDiscountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDiscountValue(e.target.value);
  };

  const checkDiscountPriceValidity = (discountValue: string) => {
    if (
      parseInt(removeNumberFormat(discountValue)) < DISCOUNT_PRICE_NUM.min ||
      parseInt(removeNumberFormat(discountValue)) > DISCOUNT_PRICE_NUM.max
    ) {
      setIsValidDiscountRange(false);
    } else {
      setIsValidDiscountRange(true);
    }
  };

  const checkDiscountRateValidity = (discountValue: string) => {
    if (
      parseInt(removeNumberFormat(discountValue)) < DISCOUNT_RATE_NUM.min ||
      parseInt(removeNumberFormat(discountValue)) > DISCOUNT_RATE_NUM.max
    ) {
      setIsValidDiscountRange(false);
    } else {
      setIsValidDiscountRange(true);
    }
  };

  return {
    DISCOUNT_PRICE,
    DISCOUNT_RATE,
    selectedDiscountType,
    handleNavigate,
    errorMessage,
    discountValue,
    setDiscountValue,
    handleDiscountType,
    handleDiscountInputChange,
    isValidDiscountRange,
    handleBlur,
  };
};
