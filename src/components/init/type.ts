import { FormInstance } from 'antd';
import { RoomOptions } from './init-accommodation-registration/type';
import { ImageFile } from '@stores/init/type';

export type ButtonContainerProps = {
  buttonStyle: 'navigate' | 'request' | 'edit' | 'addRoom';
  isValid?: boolean;
};

export type ButtonContainerStyledWrapperProps = {
  $buttonStyle: 'navigate' | 'request' | 'edit' | 'addRoom';
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
  $fileList: ImageFile[];
  header: string;
};

export type NameContainerProps = {
  header: string;
  placeholder: string;
  form: FormInstance;
  isSameRoomName?: boolean;
};
