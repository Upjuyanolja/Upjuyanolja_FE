export type PostImageFile = {
  message: string;
  code?: number | undefined;
  data: { urls: string[] };
};

export type PostAccommodationParams = {
  name: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  description: string;
  type: string;
  images: { url: string }[];
  options: {
    cooking: boolean;
    parking: boolean;
    pickup: boolean;
    barbecue: boolean;
    fitness: boolean;
    karaoke: boolean;
    sauna: boolean;
    sports: boolean;
    seminar: boolean;
  };
  rooms: {
    name: string;
    price: number;
    defaultCapacity: number;
    maxCapacity: number;
    checkInTime: string;
    checkOutTime: string;
    count: number;
    images: { url: string }[];
    options: {
      airCondition: boolean;
      tv: boolean;
      internet: boolean;
    };
  }[];
};

export type PostAccommodation = {
  message: string;
  code?: number | undefined;
  data: {
    accommodationId: number;
    name: string;
    address: string;
    description: string;
    type: string;
    images: { url: string }[];
    options: {
      cooking: boolean;
      parking: boolean;
      pickup: boolean;
      barbecue: boolean;
      fitness: boolean;
      karaoke: boolean;
      sauna: boolean;
      sports: boolean;
      seminar: boolean;
    };
    rooms: {
      name: string;
      price: number;
      defaultCapacity: number;
      maxCapacity: number;
      checkInTime: string;
      checkOutTime: string;
      count: number;
      images: { id: number; url: string }[];
      options: {
        airCondition: boolean;
        tv: boolean;
        internet: boolean;
      };
    }[];
  };
};
