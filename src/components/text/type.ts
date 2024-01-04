import { Typography } from 'antd';
import { Colors } from '@/constants/colors/type';
import { CSSProperties, css } from 'styled-components';

export const typographyMap = {
  h1: css`
    font-size: 40px;
    line-height: 1.5;
    cursor: default;
  `,
  h2: css`
    font-size: 36px;
    line-height: 1.5;
    cursor: default;
  `,
  h3: css`
    font-size: 32px;
    line-height: 1.5;
    cursor: default;
  `,
  h4: css`
    font-size: 24px;
    line-height: 1.5;
    cursor: default;
  `,
  h5: css`
    font-size: 20px;
    line-height: 1.5;
    cursor: default;
  `,
  body1: css`
    font-size: 18px;
    line-height: 1.5;
    cursor: default;
  `,
  body2: css`
    font-size: 16px;
    line-height: 1.5;
    cursor: default;
  `,
  body3: css`
    font-size: 14px;
    line-height: 1.5;
    cursor: default;
  `,
  body4: css`
    font-size: 12px;
    line-height: 1.5;
    cursor: default;
  `,
  body5: css`
    font-size: 10px;
    line-height: 1.5;
    cursor: default;
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
