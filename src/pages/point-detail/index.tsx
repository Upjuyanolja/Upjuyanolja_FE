import { Button } from 'antd';

import { useState } from 'react';

import { ReceiptModal } from '@components/modal/payment/receipt';
import { CancelModal } from '@components/modal/payment/cancel';

export const PointDetail = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const showReceiptModal = () => {
    setIsReceiptModalOpen(true);
  };
  const showCancelModal = () => {
    setIsCancelModalOpen(true);
  };
  return (
    <>
      <Button type="primary" onClick={showReceiptModal}>
        결제 영수증
      </Button>
      <Button type="primary" onClick={showCancelModal}>
        결제 취소
      </Button>
      <ReceiptModal
        isModalOpen={isReceiptModalOpen}
        setIsModalOpen={setIsReceiptModalOpen}
      ></ReceiptModal>
      <CancelModal
        isModalOpen={isCancelModalOpen}
        setIsModalOpen={setIsCancelModalOpen}
      ></CancelModal>
    </>
  );
};
