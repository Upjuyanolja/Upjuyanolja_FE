import { TextBox } from '@components/text-box';
import { FormErrorMessageProps } from './type';

export const FormErrorMessage = ({ errorMessage }: FormErrorMessageProps) => {
  return (
    <TextBox typography="body4" color="error">
      {errorMessage}
    </TextBox>
  );
};
