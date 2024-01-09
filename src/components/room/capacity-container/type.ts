import { ChangeEvent } from 'react';

export type CapacityContainerProps = {
  labelText: string;
};

export type CapacityHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};

export type ValidateInputProps = {
  value: number;
};
