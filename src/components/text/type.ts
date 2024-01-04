import { Typography } from 'antd';
import { Colors } from '@/constants/colors/type';
import { CSSProperties, css } from 'styled-components';

export const typographyMap = {
  h1: css`
    font-size: 4rem;
    line-height: 1.5;
  `,
  h2: css`
    font-size: 3.6rem;
    line-height: 1.5;
  `,
  h3: css`
    font-size: 3%.2;
    line-height: 1.5;
  `,
  h4: css`
    font-size: 2.4rem;
    line-height: 1.5;
  `,
  h5: css`
    font-size: 2rem;
    line-height: 1.5;
  `,
  body1: css`
    font-size: 1.8rem;
    line-height: 1.5;
  `,
  body2: css`
    font-size: 1.6rem;
    line-height: 1.5;
  `,
  body3: css`
    font-size: 1.4rem;
    line-height: 1.5;
  `,
  body4: css`
    font-size: 1.2rem;
    line-height: 1.5;
  `,
  body5: css`
    font-size: 1rem;
    line-height: 1.5;
  `,
};

export type Typography = keyof typeof typographyMap;

export type TextProps = {
  typography?: Typography;
  color?: Colors;
  textAlign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
};
