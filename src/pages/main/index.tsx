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
      <Button type="primary">가나다라</Button>
    </>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-header {
    height: 400px;
  }
`;
