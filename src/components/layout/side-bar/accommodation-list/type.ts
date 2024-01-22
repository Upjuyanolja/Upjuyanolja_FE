import { AccommodationListData } from '@api/accommodation/type';

export type StyledAccommodationWrapProps = {
  $height?: string;
  className: string | null;
  clickedSelectBox: boolean;
};

export type AccommodationListProps = {
  accommodationListData: AccommodationListData | undefined;
};
