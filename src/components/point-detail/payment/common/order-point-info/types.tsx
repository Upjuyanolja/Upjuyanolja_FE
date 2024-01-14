export interface orderInfoProps {
  pointCharge: boolean;
  index: number;
  status?: '결제 완료' | '취소 완료' | '구매 확정';
}
