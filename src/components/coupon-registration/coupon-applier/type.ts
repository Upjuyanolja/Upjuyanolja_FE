export type CouponApplierProps = {
  allQuantityValue: string;
  setAllQuantityValue: React.Dispatch<React.SetStateAction<string>>;
  itemQuantityValue: {
    roomId: number;
    roomName: string;
    quantity: string;
  }[];
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
