import { Button, Modal } from 'antd';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  ButtonContainerProps,
  ButtonContainerStyledWrapperProps,
} from './type';
import { TextBox } from '@components/text-box';

export const ButtonContainer = ({
  buttonStyle,
  isValid,
}: ButtonContainerProps) => {
  const navigate = useNavigate();
  const handlePreviousClick = () => {
    navigate(-1);
  };

  const confirm = () => {
    Modal.confirm({
      title: (
        <StyledConfirmHead>
          <TextBox typography="h1" fontWeight={700} color="primary">
            사장님!
          </TextBox>
          <StyledTextBox typography="h4" fontWeight={400}>
            쿠폰센터에서는 숙소 등록만 가능하며,
            <br />
            등록 완료 후, 수정 /삭제는
            <br />
            <TextBox typography="h4" fontWeight={700}>
              비즈니스 센터에서 처리 가능합니다.
            </TextBox>
          </StyledTextBox>
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
      maskClosable: true,
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
        <StyledButton type="primary" size="large" onClick={confirm}>
          등록 요청
        </StyledButton>
      )}
      {buttonStyle === 'edit' && (
        <StyledButton type="primary" size="large" disabled={!isValid}>
          수정하기
        </StyledButton>
      )}
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

const StyledTextBox = styled(TextBox)`
  white-space: pre;
  align-items: center;
  text-align: center;
`;
