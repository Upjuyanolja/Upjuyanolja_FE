export const isChar = (key: string) => {
  return !/^[0-9]+$/.test(key) && key.length === 1;
};

export const isExceededLength = (
  key: string,
  value: string,
  standard: number,
) => {
  return /^[0-9]+$/.test(key) && value.length >= standard;
};
export const isNumber = (key: string) => {
  return /^[0-9]+$/.test(key);
};
