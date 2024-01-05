import { styled } from 'styled-components';

export const ItemTypography = ({
  text,
  labelName,
}: {
  text: string;
  labelName: string;
}) => {
  return <StyledLabel htmlFor={labelName}>{text}</StyledLabel>;
};

const StyledLabel = styled.label`
  font-size: 24px;
  font-weight: 700;
`;
