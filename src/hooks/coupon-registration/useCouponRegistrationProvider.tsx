import {
  COUPON_ERROR_MESSAGE,
  DISCOUNT_PRICE,
  DISCOUNT_PRICE_NUM,
  DISCOUNT_RATE,
  DISCOUNT_RATE_NUM,
<<<<<<< HEAD
} from '@/constants/coupon';
import { numberFormat, removeNumberFormat } from '@/utils/Format/numberFormat';
import { useEffect, useState } from 'react';
=======
  DISCOUNT_VALUE_INIT,
} from '@/constants/coupon';
import { ROUTES } from '@/constants/routes';
import { numberFormat, removeNumberFormat } from '@/utils/Format/numberFormat';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
>>>>>>> a674f3cb3d4dccd1d56dfbd3d759544504336903

export const useCouponRegistrationProvider = () => {
  const [selectedDiscountType, setSelectedDiscountType] =
    useState(DISCOUNT_PRICE);
  const [errorMessage, setErrorMessage] = useState('');
  const [discountValue, setDiscountValue] = useState<string>('');
  const [isValidDiscountRange, setIsValidDiscountRange] = useState(true);
<<<<<<< HEAD

  const IS_DISCOUNT_PRICE_TYPE = selectedDiscountType === DISCOUNT_PRICE;
  const IS_DISCOUNT_RATE_TYPE = selectedDiscountType === DISCOUNT_RATE;

  // 할인 쿠폰 타입 선택
  useEffect(() => {
=======
  const navigate = useNavigate();
  const { percent } = useParams();
  const [searchParams] = useSearchParams();

  // 할인 쿠폰 타입 선택
  useEffect(() => {
    if (selectedDiscountType === DISCOUNT_PRICE) {
      navigate(ROUTES.COUPON_REGISTRATION);
    }
    if (selectedDiscountType === DISCOUNT_RATE) {
      navigate(`${ROUTES.COUPON_REGISTRATION}/percent`);
    }
>>>>>>> a674f3cb3d4dccd1d56dfbd3d759544504336903
    setDiscountValue('');
    setErrorMessage('');
  }, [selectedDiscountType]);

<<<<<<< HEAD
  // 할인가 변경
  useEffect(() => {
    if (!discountValue) {
      return setIsValidDiscountRange(true);
    }

    if (IS_DISCOUNT_PRICE_TYPE) {
      checkDiscountPriceValidity(discountValue);
    }

    if (IS_DISCOUNT_RATE_TYPE) {
      checkDiscountRateValidity(discountValue);
    }
  }, [discountValue]);

=======
  // searchParams
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

  // 할인가 변경
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

  // 할인가 변경 시 parameter로 할인가 정보 넣는 함수
  const handleNavigate = (discountValue: string) => {
    if (percent) {
      navigate(
        `${ROUTES.COUPON_REGISTRATION}/percent?discount=${discountValue}`,
      );
    } else {
      navigate(`${ROUTES.COUPON_REGISTRATION}?discount=${discountValue}`);
    }
  };

>>>>>>> a674f3cb3d4dccd1d56dfbd3d759544504336903
  // input blur 시 실행되는 함수
  const handleBlur = async (discountValue: string) => {
    if (!discountValue) {
      return;
    }
<<<<<<< HEAD

    if (IS_DISCOUNT_PRICE_TYPE) {
      await handleDiscountPriceErrorMessage(discountValue);
      await checkDiscountPriceValidity(discountValue);
    }

    if (IS_DISCOUNT_RATE_TYPE) {
      await handleDiscountRateErrorMessage(discountValue);
      await checkDiscountRateValidity(discountValue);
    }
=======
    await handleNavigate(discountValue);
>>>>>>> a674f3cb3d4dccd1d56dfbd3d759544504336903
    const formattedValue = numberFormat(discountValue);
    await setDiscountValue(formattedValue);
  };

  // 할인가 유효성 검사 후 에러메시지 핸들링 함수
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
<<<<<<< HEAD
=======
    handleNavigate,
>>>>>>> a674f3cb3d4dccd1d56dfbd3d759544504336903
    errorMessage,
    discountValue,
    setDiscountValue,
    handleDiscountType,
    handleDiscountInputChange,
    isValidDiscountRange,
    handleBlur,
  };
};
