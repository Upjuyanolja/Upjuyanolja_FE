import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { usePointCharge } from '@queries/point-charge-modal';
import { useEffect } from 'react';

import { currentUrlState } from '@stores/point-charge-modal';
import { useRecoilValue } from 'recoil';
import { TextBox } from '@components/text-box';
import { message } from 'antd';

export const TossSuccess = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const urlParams = new URLSearchParams(window.location.search);

  const orderId = urlParams.get('orderId');
  const paymentKey = urlParams.get('paymentKey');
  const amount = urlParams.get('amount');
  const pointChargeMutation = usePointCharge();

  const currentUrl = useRecoilValue(currentUrlState);

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
        handleChangeUrl(currentUrl);
      });
    }
  }, []);

  return <div></div>;
};
