import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { Column } from '@ant-design/plots';
import { ShapeAttrs } from '@antv/g-base';
import { Space } from 'antd';
import { TextBox } from '@components/text-box';

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
      <StyledTitleContainer color={colors.primary}>
        <StyledTitle>
          <TextBox color="black900" fontWeight={700} typography="h4">
            최근 일주일 일자별 매출
          </TextBox>
          <TextBox typography="body4" fontWeight={400}>
            단위:원
          </TextBox>
        </StyledTitle>
        <div>
          <StyledChartLabel>
            <StyledCharLabelColor color={colors.primary} />
            <TextBox typography="body5" fontWeight={400}>
              쿠폰 사용 매출
            </TextBox>
          </StyledChartLabel>
          <StyledChartLabel>
            <StyledCharLabelColor color={colors.black500} />
            <TextBox typography="body5" fontWeight={400}>
              쿠폰 미사용 매출
            </TextBox>
          </StyledChartLabel>
        </div>
      </StyledTitleContainer>
      <StyledChart>
        <Column {...config} legend={false} />
      </StyledChart>
      <StyledResult color="blue">
        <TextBox typography="body2" fontWeight={400} color="primary">
          김업주님, 쿠폰 발급 후
        </TextBox>
        <TextBox typography="body2" fontWeight={700} color="primary">
          매출이 100% 늘어났어요!
        </TextBox>
      </StyledResult>
    </StyledLayout>
  );
};
const StyledLayout = styled('div')`
  width: 692px;
  height: 386px;

  border: 2px solid ${(props) => props.color};
  border-radius: 8px;
  padding: 12px 42px;

  display: flex;
  flex-direction: column;
`;

const StyledTitleContainer = styled(Space)`
  width: 608px;
  border-bottom: 2px solid ${(props) => props.color};

  display: flex;
  justify-content: space-between;
`;

const StyledChart = styled('div')`
  height: 270px;
  margin-top: 16px;
`;

const StyledTitle = styled('div')`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

const StyledChartLabel = styled('div')`
  display: flex;
  align-items: center;
  gap: 2px;
`;
const StyledCharLabelColor = styled('div')`
  width: 28px;
  height: 4px;
  background-color: ${(props) => props.color};
`;

const StyledResult = styled(Space)`
  margin: 6px auto 0 auto;
  border-radius: 100px;
  padding: 0 12px;

  border: 2px solid ${(props) => props.color};
  background: linear-gradient(268deg, #e0edff 1.74%, #fff 120.49%);
`;
