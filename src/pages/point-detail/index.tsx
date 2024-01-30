import { Layout, Spin, message } from 'antd';
import styled from 'styled-components';
import { PointBox } from '@components/domain/point-detail/point-box';
import { PointDetailComp } from '@components/domain/point-detail';
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
import { MenuStatusType } from '@api/point-detail/get-point-detail/type';
import { useGetPointSummary } from '@queries/point';
import { RESPONSE_CODE } from '@/constants/api';

export const PointDetail = () => {
  const currentYear = useRecoilValue(currentYearState);
  const currentMonth = useRecoilValue(currentMonthState);
  const pageNum = useRecoilValue(pageNumState);
  const menuStatus = useRecoilValue<MenuStatusType>(menuStatusState);

  const setPointSummaryData = useSetRecoilState(pointSummaryDataState);
  const setPointDetailData = useSetRecoilState(pointDetailDataState);

  const { handleChangeUrl } = useCustomNavigate();
  const location = useLocation();

  const handleErrorResponse = (errorCode: number | undefined) => {
    switch (errorCode) {
      case RESPONSE_CODE.NOT_FOUND_POINT:
        return message.error('포인트 정보를 불러오는데 실패 했습니다.');
      default:
        return message.error('요청에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };
  const { isLoading: pointDetailDataLoading, refetch: pointDetailDataRefetch } =
    useGetPointDetail(menuStatus, pageNum, {
      select(data) {
        return data.data;
      },
      onSuccess: (data) => {
        setPointDetailData(data);
      },
      onError: (error) => {
        const errorCode = error.response?.data.code;

        handleErrorResponse(errorCode);
      },
    });

  // ${('0' + currentMonth).slice(-2)} : 1, 2, 3 을 날짜데이터형식에 맞춰 01, 02 로 바꾸기.
  const {
    isLoading: pointSummaryDataLoading,
    refetch: pointSummaryDataRefetch,
  } = useGetPointSummary(`${currentYear}-${('0' + currentMonth).slice(-2)}`, {
    select(data) {
      return data.data;
    },
    onSuccess: (data) => {
      setPointSummaryData(data);
    },
    onError: (error) => {
      const errorCode = error.response?.data.code;

      handleErrorResponse(errorCode);
    },
  });

  useEffect(() => {
    handleChangeUrl(
      `${location.pathname}?year=${currentYear}&month=${currentMonth}&menuStatus=${menuStatus}&pageNum=${pageNum}`,
    );
    pointDetailDataRefetch();
  }, [menuStatus, pageNum]);

  useEffect(() => {
    handleChangeUrl(
      `${location.pathname}?year=${currentYear}&month=${currentMonth}&menuStatus=${menuStatus}&pageNum=${pageNum}`,
    );
    pointSummaryDataRefetch();
  }, [currentMonth]);
  if (pointDetailDataLoading || pointSummaryDataLoading) {
    return (
      <StyledLoadingLayout>
        <Spin></Spin>
      </StyledLoadingLayout>
    );
  }
  return (
    <StyledLayout>
      <PointBox />
      <PointDetailComp />
    </StyledLayout>
  );
};
const StyledLayout = styled(Layout)`
  padding: 32px 48px;
  .ant-spin {
  }
`;
const StyledLoadingLayout = styled('div')`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
