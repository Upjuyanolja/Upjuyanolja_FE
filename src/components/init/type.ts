export type ButtonContainerProps = {
  buttonStyle: 'navigate' | 'request' | 'edit';
  isValid: boolean;
};

export type ButtonContainerStyledWrapperProps = {
  $buttonStyle: 'navigate' | 'request' | 'edit';
};

export type CheckBoxContainerProps = {
  options: string[];
  label: string;
  isAccommodationCategory?: boolean;
};

export type CheckBoxStyledWrapperProps = {
  color: string;
  $wrapperPadding: string;
  $wrapperGap: string;
};

export type FormErrorMessageProps = {
  errorMessage: string;
};

export type RouteConfigProps = {
  [key: string]: {
    pageName: string;
    pageDesc: string;
  };
};
