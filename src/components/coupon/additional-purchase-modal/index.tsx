import { colors } from '@/constants/colors';
import { Modal } from 'antd';
import styled from 'styled-components';

export const AdditionalPurchaseModal = () => {
  return (
    <StyledModal open={true} title="추가 구매">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 576px;
  }
  .ant-modal-body {
  }
  .ant-modal-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-modal-header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-modal-close {
    top: 10px;
  }
  .ant-modal-title {
    font-size: 32px;
    font-weight: 700;
  }
  .ant-modal-close-icon {
    width: 20px;
    height: 20px;
    color: ${colors.black900};
  }
`;
