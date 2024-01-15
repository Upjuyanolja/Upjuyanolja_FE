import { TextBox } from '@components/text-box';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const WelcomModalForTest = () => {
  const navigate = useNavigate();

  return (
    <Modal footer={[]} open={true}>
      <div>
        <TextBox>홈 이동 버튼 테스트용이므로 다른 요소 생략</TextBox>
      </div>
      <StyledToMainButton
        type="primary"
        onClick={() => navigate('/')}
        data-testid="to-main-button"
      >
        홈으로 이동
      </StyledToMainButton>
    </Modal>
  );
};

const StyledToMainButton = styled(Button)`
  width: 100%;
  height: 46px;

  font-size: 20px;
  font-weight: 700;
`;
