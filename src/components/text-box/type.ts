import { Typography } from 'antd';
import { Colors } from '@/constants/colors/type';
import { CSSProperties, css } from 'styled-components';

export const typographyMap = {
  h1: css`
    font-size: 40px;
    line-height: 1.5;
  `,
  h2: css`
    font-size: 36px;
    line-height: 1.5;
  `,
  h3: css`
    font-size: 32px;
    line-height: 1.5;
  `,
  h4: css`
    font-size: 24px;
    line-height: 1.5;
  `,
  h5: css`
    font-size: 20px;
    line-height: 1.5;
  `,
  body1: css`
    font-size: 18px;
    line-height: 1.5;
  `,
  body2: css`
    font-size: 16px;
    line-height: 1.5;
  `,
  body3: css`
    font-size: 14px;
    line-height: 1.5;
  `,
  body4: css`
    font-size: 12px;
    line-height: 1.5;
  `,
  body5: css`
    font-size: 10px;
    line-height: 1.5;
  `,
};

export type Typography = keyof typeof typographyMap;

export type TextProps = {
  typography?: Typography;
  color?: Colors;
  textalign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
  cursor?: CSSProperties['cursor'];
};
