import styled from 'styled-components';
import { SpacingProps } from './type';

export const Spacing = ({ space }: SpacingProps) => {
  return <StyledSpacing space={space}></StyledSpacing>;
};

const StyledSpacing = styled.div<SpacingProps>`
  height: ${(props) => props.space}px;
`;
