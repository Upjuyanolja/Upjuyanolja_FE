import { useEffect, useRef, useState } from 'react';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

const selector = '#payment-widget';
const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

export const TossModal = () => {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);
  const [price, setPrice] = useState(1_000);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price, currency: 'KRW', country: 'KR' },
        { variantKey: 'DEFAULT' },
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handleClickPayment = async () => {
    const paymentWidget = paymentWidgetRef.current;
    console.log('클릭');
    try {
      console.log('실행중');
      // ## Q. 결제 요청 후 계속 로딩 중인 화면이 보인다면?
      // 아직 결제 요청 중이에요. 이어서 요청 결과를 확인한 뒤, 결제 승인 API 호출까지 해야 결제가 완료돼요.
      // 코드샌드박스 환경에선 요청 결과 페이지(`successUrl`, `failUrl`)로 이동할 수가 없으니 유의하세요.
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
      //결제 성공시 파라미터 URL point-detail?paymentType=NsORMAL&orderId=zc0hRbNHRA6sL2Z2BGXbA&paymentKey=gN60L1adJYyZqmkKeP8gxYMjeX2DZp3bQRxB9lG5DnzWE7pM&amount=1000
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="payment-widget" />

      <button onClick={handleClickPayment}>결제하기</button>
    </>
  );
};
