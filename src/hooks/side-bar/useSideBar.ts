import { useGetPointSummary } from '@queries/point';
import { useGetAccommodationList } from '@queries/accommodation';

export const useSideBar = () => {
  const {
    data: pointSummaryData,
    isLoading: isPointSummaryLoading,
    isError: isPointSummaryError,
  } = useGetPointSummary({
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
