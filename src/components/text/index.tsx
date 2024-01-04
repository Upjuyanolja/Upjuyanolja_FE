import styled from 'styled-components';
import { TextProps, typographyMap } from './type';
import { colors } from '@/constants/colors';

const TextBox = styled.span<TextProps>(
  ({ color = colors.black900, textalign, fontWeight, bold }) => ({
    color: colors[color as keyof typeof colors],
    textalign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 'body1' }) => typographyMap[typography],
);

export default TextBox;
