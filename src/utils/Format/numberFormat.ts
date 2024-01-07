export const numberFormat = (input: string): string => {
  const numericValue = parseInt(input.replace(/[^\d]/g, ''));
  return numericValue.toLocaleString();
};

export const removeNumberFormat = (input: string): string => {
  const numericValue = input.replace(/[^\d]/g, '');
  return numericValue;
};
