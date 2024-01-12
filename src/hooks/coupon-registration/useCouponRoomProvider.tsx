import { useEffect, useState } from 'react';

export const useCouponRoomProvider = () => {
  const [allQuantityValue, setAllQuantityValue] = useState('0');
  const [itemQuantityValue, setItemQuantityValue] = useState('0');
  const [couponQuantitiesByRoom, setCouponQuantitiesByRoom] = useState<
    { roomName: string; roomId: number; quantity: number }[]
  >([]);

  const handleAllQuantityValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllQuantityValue(e.target.value);
  };

  const handleRoomQuantityValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItemQuantityValue(e.target.value);
  };

  const updateCouponQuantity = (
    roomName: string,
    roomId: number,
    quantity: number,
  ) => {
    const updatedQuantities = couponQuantitiesByRoom.map((item) =>
      item.roomId === roomId ? { ...item, quantity } : item,
    );

    const updatedCouponQuantities = updatedQuantities.some(
      (item) => item.roomId === roomId,
    )
      ? updatedQuantities
      : [...updatedQuantities, { roomName, roomId, quantity }];

    setCouponQuantitiesByRoom(updatedCouponQuantities);
  };

  return {
    allQuantityValue,
    setAllQuantityValue,
    setItemQuantityValue,
    handleAllQuantityValueChange,
    itemQuantityValue,
    handleRoomQuantityValueChange,
    couponQuantitiesByRoom,
    updateCouponQuantity,
  };
};
