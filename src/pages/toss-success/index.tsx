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
      console.log(data);
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
  //결제 성공시 파라미터 URL point-detail?paymentType=NsORMAL&orderId=zc0hRbNHRA6sL2Z2BGXbA&paymentKey=gN60L1adJYyZqmkKeP8gxYMjeX2DZp3bQRxB9lG5DnzWE7pM&amount=1000
  //http://localhost:3000/toss-success?paymentType=NORMAL&orderId=yLFv9nP9MZE8W8Hu_rXfZ&paymentKey=a90ZoyegEOALnQvDd2VJojv7mWpWoPrMj7X41mNW5kzKbwG6&amount=10000
  return <div></div>;
};
