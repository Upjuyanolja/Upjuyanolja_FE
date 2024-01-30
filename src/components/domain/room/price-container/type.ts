import { ChangeEvent } from 'react';
import { FormInstance } from 'antd';

export type PriceContainerProps = {
  header: string;
  form: FormInstance;
};

export type PriceHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};
