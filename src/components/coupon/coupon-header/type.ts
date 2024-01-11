export type couponHeaderProps = {
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
};
