import { AccommodationListData } from '@api/accommodation/type';

export type StyledAccommodationWrapProps = {
  $height?: string;
  className: string | null;
};

export type AccommodationListProps = {
  accommodationListData: AccommodationListData;
};
