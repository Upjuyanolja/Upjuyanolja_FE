import { ChangeEvent } from 'react';
import { FormInstance } from 'antd';

export type PriceContainerProps = {
  header: string;
  form: FormInstance;
  onValidate: (isValid: boolean) => void;
};

export type PriceHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};

export type ValidateInputProps = {
  value: number;
};
