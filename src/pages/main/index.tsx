import { Button, Modal } from 'antd';
import styled from 'styled-components';

export const Main = () => {
  return (
    <>
      <StyledModal title="Basic Modal" open={false}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </StyledModal>
      <StyledButton type="primary">가나다라</StyledButton>
    </>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-header {
    height: 400px;
  }
`;

const StyledButton = styled(Button)`
  width: 100px;
  height: 100px;
`;
