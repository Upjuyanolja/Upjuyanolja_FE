import { Button } from 'antd';

import { useState } from 'react';

import { PointModal } from '@components/modal/point/point-modal/index';
import { ReceiptModal } from '@components/modal/payment/receipt';

export const PointDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <ReceiptModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ReceiptModal>
    </>
  );
};
