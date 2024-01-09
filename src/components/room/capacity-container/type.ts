import { ChangeEvent } from 'react';

export type CapacityContainerProps = {
  header: string;
};

export type CapacityHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};

export type ValidateInputProps = {
  value: number;
};
