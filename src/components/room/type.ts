import { ChangeEvent } from 'react';

export type PriceContainerProps = {
  labelText: string;
};

export type PriceHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};

export type ValidateInputProps = {
  value: number;
};
