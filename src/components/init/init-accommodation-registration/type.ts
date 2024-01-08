import { ChangeEvent, ReactElement } from 'react';
import { RadioChangeEvent } from 'antd';
import { IconBaseProps } from 'react-icons';

export type ButtonClickedProps = {
  $clicked?: boolean;
};

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
  options: string[];
  label: string;
  icon?: ReactElement<IconBaseProps>;
};

export type AccommodationDetailCategoryOnchangeProps = {
  event: RadioChangeEvent;
};
