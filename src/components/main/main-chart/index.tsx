import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { Column } from '@ant-design/plots';
import { ShapeAttrs } from '@antv/g-base';
import { Space } from 'antd';

export const MainChart = () => {
  const data = [
    {
      year: '02/07',
      value: 3,
      type: '쿠폰 사용 매출',
    },
    {
      year: '02/08',
      value: 4,
      type: '쿠폰 사용 매출',
    },
    {
      year: '02/09',
      value: 3.5,
      type: '쿠폰 사용 매출',
    },
    {
      year: '02/10',
      value: 5,
      type: '쿠폰 사용 매출',
    },
    {
      year: '02/11',
      value: 4.9,
      type: '쿠폰 사용 매출',
    },
    {
      year: '02/12',
      value: 6,
      type: '쿠폰 사용 매출',
    },
    {
      year: '02/13',
      value: 7,
      type: '쿠폰 사용 매출',
    },
    {
      year: '02/07',
      value: 3,
      type: '쿠폰 미사용 매출',
    },
    {
      year: '02/08',
      value: 4,
      type: '쿠폰 미사용 매출',
    },
    {
      year: '02/09',
      value: 3.5,
      type: '쿠폰 미사용 매출',
    },
    {
      year: '02/10',
      value: 5,
      type: '쿠폰 미사용 매출',
    },
    {
      year: '02/11',
      value: 4.9,
      type: '쿠폰 미사용 매출',
    },
    {
      year: '02/12',
      value: 6,
      type: '쿠폰 미사용 매출',
    },
    {
      year: '02/13',
      value: 7,
      type: '쿠폰 미사용 매출',
    },
  ];

  const config = {
    data,
    isStack: true,
    seriesField: 'type',
    xField: 'year',
    yField: 'value',
    columnWidthRatio: 0.8,
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    colorField: 'type',
    color: [colors.primary, colors.black500],
    connectedArea: {
      style: (oldStyle: ShapeAttrs) => {
        return {
          fill: colors.black600,
          stroke: oldStyle.fill,
          lineWidth: 0.5,
        };
      },
    },
  };
  return (
    <StyledLayout color={colors.blue}>
      <Column {...config} legend={false} />
    </StyledLayout>
  );
};
const StyledLayout = styled('div')`
  width: 692px;
  height: 386px;

  border: 2px solid ${(props) => props.color};
  border-radius: 8px;
`;

const StyledTitle = styled(Space)`
  width:;
`;
