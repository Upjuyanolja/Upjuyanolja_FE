import { useGetPointTotal } from '@queries/point';
import { useGetAccommodationList } from '@queries/accommodation';

export const useSideBar = () => {
  const {
    data: pointTotalData,
    isLoading: isPointTotalLoading,
    isError: isPointTotalError,
  } = useGetPointTotal({
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
    pointTotalData,
    isPointTotalLoading,
    isPointTotalError,
    isAccommodationListLoading,
    accommodationListData,
    isAccommodationListError,
  };
};
