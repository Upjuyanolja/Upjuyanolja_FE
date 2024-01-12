export type RoomCouponApplierProps = {
  roomName: string;
  index: number;
  roomId: number;
  itemQuantityValue: {
    roomId: number;
    roomName: string;
    quantity: string;
  };
  setItemQuantityValue: React.Dispatch<
    React.SetStateAction<
      {
        roomId: number;
        roomName: string;
        quantity: string;
      }[]
    >
  >;
};
