import styled from 'styled-components';
import { SpacingProps } from './type';

export const Spacing = ({ space, $bgColor }: SpacingProps) => {
  return <StyledSpacing space={space} $bgColor={$bgColor}></StyledSpacing>;
};

const StyledSpacing = styled.div<SpacingProps>`
  height: ${(props) => props.space}px;
  background-color: ${(props) => props.$bgColor};
`;
