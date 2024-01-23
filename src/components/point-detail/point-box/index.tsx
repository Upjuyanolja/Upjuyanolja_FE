import { colors } from '@/constants/colors';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { TextBox } from '@components/text-box';
import { Layout, Space } from 'antd';
import styled from 'styled-components';
import {
  currentYearState,
  currentMonthState,
  pointSummaryDataState,
} from '@stores/point-detail/atoms';
import { useRecoilState } from 'recoil';

import { numberFormat } from '@/utils/Format/numberFormat';
const MONTH_JANUARY = 1;
const MONTH_DECEMBER = 12;

export const PointBox = () => {
  const [pointSummaryData] = useRecoilState(pointSummaryDataState);

  const [currentYear, setCurrentYear] = useRecoilState(currentYearState);
  const [currentMonth, setCurrentMonth] = useRecoilState(currentMonthState);
  const handleClickDateButton = (sign: 'prev' | 'next') => {
    if (sign === 'prev') {
      const subCurrentYear =
        currentMonth === MONTH_JANUARY ? currentYear - 1 : currentYear;
      const subCurrentMonth =
        currentMonth === MONTH_JANUARY ? currentMonth + 11 : currentMonth - 1;

      setCurrentYear(subCurrentYear);
      setCurrentMonth(subCurrentMonth);
    } else {
      const addCurrentMonth =
        currentMonth === MONTH_DECEMBER ? currentMonth - 11 : currentMonth + 1;
      const addCurrentYear =
        currentMonth === MONTH_DECEMBER ? currentYear + 1 : currentYear;

      const defaultDate = new Date();
      const defaultYear = defaultDate.getFullYear();
      const defaultMonth = defaultDate.getMonth() + 1;

      if (
        addCurrentYear < defaultYear ||
        (addCurrentYear === defaultYear && addCurrentMonth <= defaultMonth)
      ) {
        setCurrentYear(addCurrentYear);
        setCurrentMonth(addCurrentMonth);
      }
    }
  };

  return (
    <Layout>
      <TextBox typography="h4" color="black900" fontWeight="bold">
        포인트 내역
      </TextBox>
      <StyledPointDetailWrap>
        <StyledDateWrap>
          <CaretLeftOutlined
            size={24}
            onClick={() => handleClickDateButton('prev')}
          />

          <TextBox
            typography="h5"
            color="white"
            fontWeight="bold"
            style={{ margin: '0px 24px' }}
            data-testid="dateSpan"
          >
            {currentYear} . {currentMonth}월
          </TextBox>

          <CaretRightOutlined
            size={24}
            onClick={() => handleClickDateButton('next')}
          />
        </StyledDateWrap>
        <StyledPointUsingInfo>
          <StyledPointUsingInfoList direction="vertical">
            <div>
              <TextBox typography="body2" color="black800" fontWeight="bold">
                이달 충전 포인트
              </TextBox>
            </div>
            <div>
              <TextBox typography="h3" color="black800" fontWeight="bold">
                {numberFormat(pointSummaryData.chargePoint || '0')}P
              </TextBox>
              <br />
              <TextBox typography="body3" color="black800" fontWeight="400">
                ({numberFormat(pointSummaryData.chargePoint || '0')}
                원)
              </TextBox>
            </div>
          </StyledPointUsingInfoList>
          <StyledPointUsingInfoList direction="vertical">
            <div>
              <TextBox typography="body2" color="black800" fontWeight="bold">
                사용한 포인트
              </TextBox>
            </div>
            <div>
              <TextBox typography="h3" color="black800" fontWeight="bold">
                {numberFormat(pointSummaryData.usePoint || '0')}P
              </TextBox>
              <br />
              <TextBox typography="body3" color="black800" fontWeight="400">
                ({numberFormat(pointSummaryData.usePoint || '0')}
                원)
              </TextBox>
            </div>
          </StyledPointUsingInfoList>
          <StyledPointUsingInfoList direction="vertical">
            <div>
              <TextBox typography="body2" color="primary" fontWeight="bold">
                현재 보유 포인트
              </TextBox>
            </div>
            <div>
              <TextBox typography="h3" color="primary" fontWeight="bold">
                {numberFormat(pointSummaryData.currentPoint || '0')}P
              </TextBox>
              <br />
              <TextBox typography="body3" color="primary" fontWeight="400">
                ({numberFormat(pointSummaryData.currentPoint || '0')}원)
              </TextBox>
            </div>
          </StyledPointUsingInfoList>
        </StyledPointUsingInfo>
      </StyledPointDetailWrap>
    </Layout>
  );
};

const StyledPointDetailWrap = styled('div')`
  width: 100%;

  margin: 16px 0px;

  border: 2px solid ${colors.primary};
  border-radius: 8px;
`;
const StyledDateWrap = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.primary};

  padding: 8px 0px;

  svg {
    width: 24px;
    height: 24px;
    color: ${colors.white};
  }
`;
const StyledPointUsingInfo = styled(Space)`
  padding: 24px 124px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledPointUsingInfoList = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;
