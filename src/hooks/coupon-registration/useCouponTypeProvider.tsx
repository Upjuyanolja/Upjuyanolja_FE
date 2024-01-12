export const useCouponTypeProvider = () => {
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
    isNumberDiscountValue,
    handleEnterKeyDown,
  };
};
