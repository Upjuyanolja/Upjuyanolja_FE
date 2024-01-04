import { styled } from 'styled-components';

export const ItemTypography = ({ text }: { text: string }) => {
  return <StyledText>{text}</StyledText>;
};

const StyledText = styled.h4`
  font-size: 24px;
  font-weight: 700;
`;
