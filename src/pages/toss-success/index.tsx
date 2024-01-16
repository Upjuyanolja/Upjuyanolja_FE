import { usePointCharge } from '@queries/point-charge-modal';
import { useEffect } from 'react';
import { TextBox } from '@components/text-box';
import { message } from 'antd';
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
      pointChargeMutation.mutateAsync(data).then(() => {
        message.success({
          content: (
            <TextBox typography="body3" fontWeight={'400'}>
              결제에 성공했습니다.
            </TextBox>
          ),
          duration: 2,
        });
        navigation(-1);
      });
    }
  }, []);

  return <div></div>;
};
