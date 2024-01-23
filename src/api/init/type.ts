export type PostImageFile = {
  urls: { url: string }[];
};

export type PostAccommodationParams = {
  name: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  description: string;
  category: string;
  images: { url: string }[];
  thumbnail: string;
  option: {
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
    amount: number;
    images: { url: string }[];
    option: {
      airCondition: boolean;
      tv: boolean;
      internet: boolean;
    };
  }[];
};

export type PostAccommodation = {
  accommodationId: number;
  name: string;
  address: string;
  description: string;
  category: string;
  images: { url: string; id: number }[];
  option: {
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
    id: number;
    name: string;
    price: number;
    defaultCapacity: number;
    maxCapacity: number;
    checkInTime: string;
    checkOutTime: string;
    count: number;
    images: { id: number; url: string }[];
    option: {
      airCondition: boolean;
      tv: boolean;
      internet: boolean;
    };
  }[];
};
