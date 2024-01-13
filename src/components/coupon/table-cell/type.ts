/* eslint-disable no-unused-vars */
import { tableData } from '../table/type';

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
  record: tableData;
  handleChangeInput: (
    event: React.KeyboardEvent<HTMLInputElement>,
    key: number,
  ) => void;
};
