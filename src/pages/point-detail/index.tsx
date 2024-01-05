import { Button } from 'antd';

import { useState } from 'react';

import { PointModal } from './point-modal/index';

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
      <PointModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></PointModal>
    </>
  );
};
