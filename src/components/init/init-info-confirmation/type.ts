import { ReactNode } from 'react';

export type CustomButtonProps = {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
};

export type RoomData = {
  name: string;
  price: number;
  defaultCapacity: number;
  maxCapacity: number;
  checkInTime: string;
  checkOutTime: string;
  count: number;
  images: {
    url: string;
  }[];
  options: {
    airCondition: boolean;
    tv: boolean;
    internet: boolean;
  };
};
