import {
  DiscountPriceType,
  DiscountRateType,
} from '@/constants/coupon-registration/type';

export type CouponTypeProps = {
  selectedDiscountType: DiscountPriceType | DiscountRateType;
  setSelectedDiscountType: React.Dispatch<
    React.SetStateAction<DiscountPriceType | DiscountRateType>
  >;
  discountValue: string;
  setDiscountValue: React.Dispatch<React.SetStateAction<string>>;
};
