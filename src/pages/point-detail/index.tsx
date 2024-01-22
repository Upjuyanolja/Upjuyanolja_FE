import { Layout } from 'antd';
import styled from 'styled-components';
import { PointBox } from '@components/point-detail/point-box';
import { PointDetailComp } from '@components/point-detail';
import { useEffect } from 'react';
import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentYearState,
  currentMonthState,
  pageNumState,
  menuStatusState,
  pointSummaryDataState,
  pointDetailDataState,
} from '@stores/point-detail/atoms';
import { useGetPointDetail } from '@queries/point-detail';
import { menuStatusType } from '@api/point-detail/get-point-detail/type';
import { useGetPointSummary } from '@queries/point';

export const PointDetail = () => {
  const currentYear = useRecoilValue(currentYearState);
  const currentMonth = useRecoilValue(currentMonthState);
  const pageNum = useRecoilValue(pageNumState);
  const menuStatus = useRecoilValue<menuStatusType>(menuStatusState);

  const setPointSummaryData = useSetRecoilState(pointSummaryDataState);
  const setPointDetailData = useSetRecoilState(pointDetailDataState);

  const { handleChangeUrl } = useCustomNavigate();
  const location = useLocation();

  const { refetch: pointDetailDataRefetch } = useGetPointDetail(
    menuStatus,
    pageNum,
    {
      select(data) {
        return data.data.data;
      },

      onSuccess: (data) => setPointDetailData(data),
    },
  );

  const { refetch: pointSummaryDataRefetch } = useGetPointSummary({
    select(data) {
      return data.data.data;
    },

    onSuccess: (data) => setPointSummaryData(data),
  });

  useEffect(() => {
    handleChangeUrl(
      `${location.pathname}?year=${currentYear}&month=${currentMonth}&menuStatus=${menuStatus}&pageNum=${pageNum}`,
    );
    pointDetailDataRefetch();
  }, [menuStatus, pageNum, location.search]);

  useEffect(() => {
    handleChangeUrl(
      `${location.pathname}?year=${currentYear}&month=${currentMonth}&menuStatus=${menuStatus}&pageNum=${pageNum}`,
    );
    pointSummaryDataRefetch();
  }, [currentMonth]);

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
