export const isNumber = (value: string | number) => {
  if (typeof value === 'number') {
    return /^[0-9]+$/.test(value.toString());
  } else {
    return /^[0-9]+$/.test(value);
  }
};
