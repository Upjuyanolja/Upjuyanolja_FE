import { Button, Modal } from 'antd';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  ButtonContainerProps,
  ButtonContainerStyledWrapperProps,
} from './type';
import { TextBox } from '@components/text-box';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';

export const ButtonContainer = ({
  buttonStyle,
  isValid,
}: ButtonContainerProps) => {
  const navigate = useNavigate();

  const handlePreviousClick = () => {
    if (window.location.pathname === ROUTES.INIT_ACCOMMODATION_REGISTRATION)
      navigate(-1);
    else if (window.location.pathname === ROUTES.INIT_ROOM_REGISTRATION)
      navigate(ROUTES.INIT_ACCOMMODATION_REGISTRATION);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOk = () => {
    setIsModalOpen(false);
  };

  const confirm = () => {
    Modal.confirm({
      title: (
        <StyledConfirmHead>
          <TextBox typography="h1" fontWeight={700} color="primary">
            사장님!
          </TextBox>
          <StyledMiddleTextContainer>
            <TextBox typography="h4" fontWeight={700}>
              쿠폰센터에서는 숙소 등록만 가능하며,
            </TextBox>
            <br />
            <TextBox typography="h4" fontWeight={400}>
              등록 완료 후
            </TextBox>
            <br />
            <TextBox typography="h4" fontWeight={700} color="error">
              수정 /삭제는 비즈니스 센터에서 처리 가능합니다.
            </TextBox>
          </StyledMiddleTextContainer>
        </StyledConfirmHead>
      ),
      content: (
        <StyledNextText>
          <TextBox typography="h5" fontWeight={700}>
            다음으로 넘어갈까요?
          </TextBox>
        </StyledNextText>
      ),
      okText: '등록완료',
      cancelText: '머무르기',
      icon: '',
      width: '576px',
      bodyStyle: { height: '621px' },
      centered: true,
      onOk: () => setIsModalOpen(true),
    });
  };

  return (
    <StyledWrapper $buttonStyle={buttonStyle}>
      {buttonStyle === 'navigate' && (
        <>
          <StyledButton type="primary" ghost onClick={handlePreviousClick}>
            이전
          </StyledButton>
          <StyledButton
            type="primary"
            disabled={!isValid}
            data-testid="accommodation-next-button"
            htmlType="submit"
          >
            다음
          </StyledButton>
        </>
      )}
      {buttonStyle === 'request' && (
        <StyledButton
          type="primary"
          size="large"
          onClick={confirm}
          data-testid="request-button"
          disabled={!isValid}
        >
          등록 요청
        </StyledButton>
      )}
      {buttonStyle === 'edit' && (
        <StyledButton
          type="primary"
          size="large"
          disabled={!isValid}
          htmlType="submit"
        >
          수정하기
        </StyledButton>
      )}
      <Modal
        open={isModalOpen}
        onOk={handleModalOk}
        footer={[]}
        closable={false}
        width={576}
        centered={true}
      >
        <StyledTextContainer>
          <TextBox typography="h1" fontWeight={700} color="primary">
            환영합니다!
          </TextBox>
          <TextBox
            typography="h4"
            fontWeight={400}
            style={{ textAlign: 'center' }}
          >
            레스케이프 호텔 숙소
            <br />
            등록이 완료되었습니다.
          </TextBox>
        </StyledTextContainer>
        <StyledToMainButton
          type="primary"
          onClick={() => navigate(ROUTES.MAIN)}
        >
          홈으로 이동
        </StyledToMainButton>
      </Modal>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<ButtonContainerStyledWrapperProps>`
  width: 100%;

  display: ${(props) =>
    props.$buttonStyle === 'navigate' || props.$buttonStyle === 'edit'
      ? 'grid'
      : 'block'};
  grid-template-columns: ${(props) =>
    props.$buttonStyle === 'navigate'
      ? '1fr 2.5fr'
      : props.$buttonStyle === 'edit'
        ? 'auto'
        : 'none'};
  gap: ${(props) => (props.$buttonStyle === 'navigate' ? '10px' : '0')};
`;

const StyledButton = styled(Button)`
  height: 62px;
  font-size: 20px;
`;

const StyledConfirmHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  margin-top: 80px;
`;

const StyledNextText = styled.div`
  margin: 130px 0 3px;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 507px;
`;

const StyledMiddleTextContainer = styled.div`
  text-align: center;
`;

const StyledToMainButton = styled(Button)`
  width: 100%;
  height: 46px;

  font-size: 20px;
  font-weight: 700;
`;
