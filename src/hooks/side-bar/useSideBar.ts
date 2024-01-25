import { useGetPointSummary } from '@queries/point';
import { useGetAccommodationList } from '@queries/accommodation';
import { useRecoilValue } from 'recoil';
import {
  currentMonthState,
  currentYearState,
} from '@stores/point-detail/atoms';

export const useSideBar = () => {
  const currentYear = useRecoilValue(currentYearState);
  const currentMonth = useRecoilValue(currentMonthState);

  const {
    data: pointSummaryData,
    isLoading: isPointSummaryLoading,
    isError: isPointSummaryError,
  } = useGetPointSummary(`${currentYear}-${('0' + currentMonth).slice(-2)}`, {
    select(data) {
      return data.data;
    },
  });

  const {
    data: accommodationListData,
    isLoading: isAccommodationListLoading,
    isError: isAccommodationListError,
  } = useGetAccommodationList({
    select(data) {
      return data.data;
    },
  });

  return {
    pointSummaryData,
    isPointSummaryLoading,
    isAccommodationListLoading,
    isPointSummaryError,
    accommodationListData,
    isAccommodationListError,
  };
};
