import { FormInstance } from 'antd';

export type TimeContainerProps = {
  header: string;
  form: FormInstance;
  defaultCheckInTime?: string;
  defaultCheckOutTime?: string;
};
