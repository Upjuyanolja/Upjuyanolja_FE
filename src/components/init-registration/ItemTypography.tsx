import { TextBox } from '@components/text-box';

export const ItemTypography = ({ text }: { text: string }) => {
  return (
    <TextBox typography="h4" fontWeight={700}>
      {text}
    </TextBox>
  );
};
