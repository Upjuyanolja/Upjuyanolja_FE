export type ButtonContainerProps = {
  buttonStyle: 'navigate' | 'request' | 'edit';
  isValid: boolean;
};

export type ButtonContainerStyledWrapperProps = {
  $buttonStyle: 'navigate' | 'request' | 'edit';
};

export type CheckBoxContainerProps = {
  options: { [key: string]: string };
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

export type NameContainerProps = {
  header: string;
  placeholder: string;
};

export type ValidateInput = {
  value: string;
};
