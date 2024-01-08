import { ChangeEvent } from 'react';

export type ButtonContainerProps = {
  buttonStyle: 'navigate' | 'request' | 'edit';
  isValid: boolean;
};

export type ButtonContainerStyledWrapperProps = {
  $buttonStyle: 'navigate' | 'request' | 'edit';
};

export type CheckBoxContainerProps = {
  options: string[];
  header: string;
};

export type FormErrorMessageProps = {
  errorMessage: string;
};

export type ImageUploadFileItem = {
  uid: number;
  name: string;
  url: string;
  originFileObj?: File;
};

export type ImageUploadContainerProps = {
  header: string;
};

export type ImageUploadHandleChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};

export type NameConatainerProps = {
  header: string;
};

export type ValidateInputProps = {
  value: string;
};

export type NameHandleInputChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
};
