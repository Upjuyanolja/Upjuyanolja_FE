import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './style.css';
import { usePointCharge } from '@queries/point-charge-modal';

export function TossSuccess() {
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const pointChargeMutation = usePointCharge();
  useEffect(() => {
    const fetchData = async () => {
      if (orderId && paymentKey && amount) {
        const data = {
          orderId,
          paymentKey,
          amount: parseInt(amount),
        };
        await pointChargeMutation.mutateAsync(data);
      }
    };

    fetchData();
  }, [orderId, paymentKey, amount]);

  return <div></div>;
}
