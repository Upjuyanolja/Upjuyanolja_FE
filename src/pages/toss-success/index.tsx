import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './style.css';
// import { usePointCharge } from '@queries/point-charge-modal';
import { numberFormat } from '@/utils/Format/numberFormat';
export function TossSuccess() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  // 테스트 미완성 ( 백엔드 API 에러)
  // const pointChargeMutation = usePointCharge();

  async function confirmPayment() {
    if (orderId && paymentKey && amount) {
      // const data = {
      //   orderId,
      //   paymentKey,
      //   amount: parseInt(amount),
      // };
      setIsConfirmed(true);

      // const res = await pointChargeMutation.mutateAsync(data);
      // if (res.status) {
      //   setIsConfirmed(true);
      // }
    }
  }

  return (
    <div className="wrapper w-100">
      {isConfirmed ? (
        <div
          className="flex-column align-center confirm-success w-100 max-w-540"
          style={{
            display: 'flex',
          }}
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            width="120"
            height="120"
          />
          <h2 className="title">결제를 완료했어요</h2>
          <div className="response-section w-100">
            <div className="flex justify-between">
              <span className="response-label">결제 금액</span>
              <span id="amount" className="response-text">
                {numberFormat(amount || 1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">주문번호</span>
              <span id="orderId" className="response-text">
                {orderId}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-column align-center confirm-loading w-100 max-w-540">
          <div className="flex-column align-center">
            <img
              src="https://static.toss.im/lotties/loading-spot-apng.png"
              width="120"
              height="120"
            />
            <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
            <h4 className="text-center description">
              결제 승인하고 완료해보세요.
            </h4>
          </div>
          <div className="w-100">
            <button className="btn primary w-100" onClick={confirmPayment}>
              결제 승인하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
