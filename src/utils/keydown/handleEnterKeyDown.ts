export const handleEnterKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (e.key === 'Enter') {
    e.currentTarget.blur();
  }
};
