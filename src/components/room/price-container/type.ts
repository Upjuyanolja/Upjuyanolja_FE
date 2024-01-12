import { ChangeEvent } from 'react';

export type PriceContainerProps = {
  header: string;
};

export type PriceHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};

export type ValidateInputProps = {
  value: number;
};
