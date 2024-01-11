import { useEffect, useState } from 'react';

export const useCouponRoomProvider = () => {
  const [isCheckedAllQuantity, setIsCheckedAllQuantity] = useState(true);
  const [checkedRoomQuantity, setCheckedRoomQuantity] = useState(false);
  const [allQuantityValue, setAllQuantityValue] = useState('0');

  useEffect(() => {
    if (isCheckedAllQuantity) {
      console.log('비활성화');
    } else {
      console.log('활성화');
      setCheckedRoomQuantity(false);
    }
  }, [isCheckedAllQuantity]);

  useEffect(() => {
    console.log('##');
  }, [checkedRoomQuantity]);

  const handleIsAllQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllQuantityValue(e.target.value);
  };

  const handleIsCheckedAllQuantity = () => {
    setIsCheckedAllQuantity(!isCheckedAllQuantity);
  };

  const handleIsCheckedRoomQuantity = () => {
    setCheckedRoomQuantity(!checkedRoomQuantity);
  };

  return {
    handleIsAllQuantityChange,
    handleIsCheckedAllQuantity,
    isCheckedAllQuantity,
    allQuantityValue,
    checkedRoomQuantity,
    handleIsCheckedRoomQuantity,
  };
};
