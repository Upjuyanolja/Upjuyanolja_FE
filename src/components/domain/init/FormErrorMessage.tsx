import { TextBox } from '@components/atom/text-box';

export const FormErrorMessage = ({
  errorMessage,
}: {
  errorMessage: string;
}) => {
  return (
    <TextBox typography="body4" color="error">
      {errorMessage}
    </TextBox>
  );
};
