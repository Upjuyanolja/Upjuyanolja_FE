import { usePointCharge } from '@queries/point-charge-modal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TossSuccess = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const orderId = urlParams.get('orderId');
  const paymentKey = urlParams.get('paymentKey');
  const amount = urlParams.get('amount');
  const pointChargeMutation = usePointCharge();

  const navigation = useNavigate();

  useEffect(() => {
    if (orderId && paymentKey && amount) {
      const data = {
        orderId,
        paymentKey,
        amount: parseInt(amount),
      };
      pointChargeMutation.mutateAsync(data);
    } else {
      navigation(-1);
    }
  }, []);

  return <div></div>;
};
