import { FormInstance } from 'antd';
import { RoomOptions } from './init-accommodation-registration/type';

export type ButtonContainerProps = {
  buttonStyle: 'navigate' | 'request' | 'edit';
  isValid?: boolean;
  handleEdit?: VoidFunction;
};

export type ButtonContainerStyledWrapperProps = {
  $buttonStyle: 'navigate' | 'request' | 'edit';
};

export type CheckBoxContainerProps = {
  options: { [key: string]: string };
  header: string;
  defaultValue?: RoomOptions;
};

export type ImageUploadFileItem = {
  uid: number;
  name: string;
  url: string;
  originFileObj?: File | null;
};

export type StyledImageContainerProps = {
  $fileList: ImageUploadFileItem[];
  header: string;
};

export type NameContainerProps = {
  header: string;
  placeholder: string;
  form: FormInstance;
  isSameRoomName?: boolean;
};
