export type CouponHeaderProps = {
  expiry: string;
  couponStatusOption: (
    | {
        value: 'ENABLE';
        label: '발급 중';
      }
    | {
        value: 'DISABLE';
        label: '발급 중지';
      }
  )[];
  // eslint-disable-next-line no-unused-vars
  handleStatusSelect: (value: string) => void;
};
