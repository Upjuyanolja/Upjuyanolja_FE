import { useGetPointSummary } from '@queries/point';
import { useGetAccommodationList } from '@queries/accommodation';

export const useSideBar = () => {
  const { data: pointSummaryData, isError: isPointSummaryError } =
    useGetPointSummary({
      select(data) {
        return data.data.data;
      },
      staleTime: 60 * 60 * 1000,
    });

  const { data: accommodationListData, isError: isAccommodationListError } =
    useGetAccommodationList({
      select(data) {
        return data.data.data;
      },
      staleTime: 60 * 60 * 1000,
    });

  return {
    pointSummaryData,
    isPointSummaryError,
    accommodationListData,
    isAccommodationListError,
  };
};
