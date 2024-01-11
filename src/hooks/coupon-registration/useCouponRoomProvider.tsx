import { useState } from 'react';

export const useCouponRoomProvider = () => {
  const [allQuantityValue, setAllQuantityValue] = useState('0');
  const [roomQuantityValue, setRoomQuantityValue] = useState('0');

  const handleAllQuantityValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllQuantityValue(e.target.value);
  };

  const handleRoomQuantityValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRoomQuantityValue(e.target.value);
  };

  return {
    allQuantityValue,
    setAllQuantityValue,
    handleAllQuantityValueChange,
    roomQuantityValue,
    handleRoomQuantityValueChange,
  };
};
