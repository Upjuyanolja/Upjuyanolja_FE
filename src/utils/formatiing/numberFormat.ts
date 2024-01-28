export const numberFormat = (input: string | number): string => {
  const numericValue =
    typeof input === 'string' ? parseInt(input.replace(/[^\d]/g, '')) : input;
  return numericValue.toLocaleString();
};

export const removeNumberFormat = (input: string): string => {
  const numericValue = input.replace(/[^\d]/g, '');
  return numericValue;
};
