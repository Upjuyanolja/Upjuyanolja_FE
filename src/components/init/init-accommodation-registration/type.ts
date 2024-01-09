import { ChangeEvent, ReactElement } from 'react';
import { RadioChangeEvent } from 'antd';
import { IconBaseProps } from 'react-icons';

export type AddressHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
  inputType: string;
};

export type AccommodationCategoryProps =
  | 'hotelResort'
  | 'motel'
  | 'pensionPool'
  | 'guestHouse'
  | null;

export type HandleTextAreaChangeProps = {
  event: ChangeEvent<HTMLTextAreaElement>;
};

export type AccommodationDetailCategoryProps = {
  options: { [key: string]: string };
  label: string;
  icon?: ReactElement<IconBaseProps>;
};

export type AccommodationDetailCategoryOnchangeProps = {
  event: RadioChangeEvent;
};

export type AddressFormatProps = {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
};

export type formValues = {
  [key: string]: string;
};

/**request 타입 */

type Image = {
  url: string;
};

type Options = {
  cooking: boolean;
  parking: boolean;
  pickup: boolean;
  barbecue: boolean;
  fitness: boolean;
  karaoke: boolean;
  sauna: boolean;
  sports: boolean;
  seminar: boolean;
};

type Room = {
  name: string;
  price: number | null;
  defaultCapacity: number | null;
  maxCapacity: number | null;
  checkInTime: string;
  checkOutTime: string;
  count: number | null;
  images: Image[];
  options: {
    airCondition: boolean;
    tv: boolean;
    internet: boolean;
  };
};

export type UserInputValue = {
  id: number | null;
  name: string;
  address: string;
  detailAddress: string;
  description: string;
  type: string;
  images: Image[];
  options: Options;
  rooms: Room[];
};
