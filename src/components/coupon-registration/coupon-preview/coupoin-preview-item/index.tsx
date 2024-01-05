export const CouponPreviewItem = ({ data }: CouponPreviewItemProps) => {
  return (
    <div>
      <div>{data.roomName}</div>
      <div>{data.couponName}</div>
      <div>{data.couponPrice}</div>
      <div>{data.couponAmount}</div>
    </div>
  );
};

export type CouponPreviewItemProps = {
  data: {
    roomName: string;
    couponName: string;
    couponPrice: number;
    couponAmount: number;
  };
};
