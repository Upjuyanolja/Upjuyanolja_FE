import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import { FormInstance } from 'antd/es/form/Form';

export type AccommodationCategoryType =
  | 'HOTEL/RESORT'
  | 'MOTEL'
  | 'PENSION_POOL_VILLA'
  | 'GUEST_HOUSE'
  | null;

export type AccommodationDetailCategoryProps = {
  options: { [key: string]: string };
  label: string;
  icon?: ReactElement<IconBaseProps>;
  form: FormInstance;
};

export type AddressFormat = {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
};

/**request 타입 */
export type Image = {
  url: string;
};

export type Options = {
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
  name: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  description: string;
  type: string;
  images: Image[];
  options: Options;
  rooms: Room[];
};
