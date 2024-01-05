export const numberFormat = (input: string): string => {
  if (input) {
    const numericValue = parseInt(input.replace(/[^\d]/g, ''));
    return numericValue.toLocaleString();
  } else {
    return '';
  }
};

export const removeNumberFormat = (input: string): string => {
  const numericValue = input.replace(/[^\d]/g, '');
  return numericValue;
};
