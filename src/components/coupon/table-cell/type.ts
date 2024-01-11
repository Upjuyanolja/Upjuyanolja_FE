export type roomContainerProps = {
  room: {
    name: string;
    price: number;
  };
};

export type couponNameContainerProps = {
  info: { name: string; appliedPrice: number };
  isSoldOut: boolean;
};

export type dayLimitInputProps = {
  dayLimit: number;
  isSoldOut: boolean;
};
