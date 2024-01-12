import { menuStatusType } from '@api/point-detail/get-point-detail/type';
import { useGetPointSummary } from '@queries/point';
import { useGetPointDetail } from '@queries/point-detail';
export const usePointDetail = (menuStatus: menuStatusType, page: number) => {
  const {
    data: pointSummaryData,
    isError: isPointSummaryError,
    refetch: pointSummaryDataRefetch,
  } = useGetPointSummary({
    select(data) {
      return data.data.data;
    },
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: pointDetailData,
    isError: isPointDetailError,
    refetch: pointDetailDataRefetch,
  } = useGetPointDetail(menuStatus, page, {
    select(data) {
      return data.data.data;
    },
  });
  return {
    pointDetailData,
    isPointDetailError,
    pointSummaryDataRefetch,
    pointSummaryData,
    isPointSummaryError,
    pointDetailDataRefetch,
  };
};
