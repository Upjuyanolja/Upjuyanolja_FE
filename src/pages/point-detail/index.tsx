import { Layout } from 'antd';

import styled from 'styled-components';

import { PointBox } from '@components/point-detail/point-box';
import { PointDetailComp } from '@components/point-detail';

export const PointDetail = () => {
  return (
    <StyledLayout>
      <PointBox />
      <PointDetailComp />
    </StyledLayout>
  );
};
const StyledLayout = styled(Layout)`
  padding: 32px 48px;
`;
