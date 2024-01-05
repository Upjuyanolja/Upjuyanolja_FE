import styled from 'styled-components';
import { TextProps, typographyMap } from './type';
import { colors } from '@/constants/colors';

export const TextBox = styled.span<TextProps>(
  ({ color = colors.black900, textAlign, fontWeight, bold, cursor }) => ({
    color: colors[color as keyof typeof colors],
    textalign,
    fontWeight: bold ? 'bold' : fontWeight,
    cursor,
  }),
  ({ typography = 'body1' }) => typographyMap[typography],
);
