export type ButtonContainerProps = {
  isValid?: boolean;
};

export type ImageDeleteContainerProps = {
  header: string;
};

export type Image = {
  url: string;
};

export type RoomOptions = {
  airCondition: boolean;
  tv: boolean;
  internet: boolean;
};

export type RoomImageOptions = {
  images: Image[] | undefined;
  options: RoomOptions | undefined;
};
