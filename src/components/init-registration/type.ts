import { ChangeEvent } from 'react';

export type ButtonClickedProps = {
  $clicked?: boolean;
};

export type AddressHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
  inputType: string;
};

export type HandleTextAreaChangeProps = {
  event: ChangeEvent<HTMLTextAreaElement>;
};

export type ValidateInputProps = {
  value: string;
};

export type NameHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};
