import { Button } from 'antd';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  ButtonContainerProps,
  ButtonContainerStyledWrapperProps,
} from './type';

export const ButtonContainer = ({
  buttonStyle,
  isValid,
}: ButtonContainerProps) => {
  const navigate = useNavigate();
  const handlePreviousClick = () => {
    navigate(-1);
  };

  return (
    <StyledWrapper $buttonStyle={buttonStyle}>
      {buttonStyle === 'register' && (
        <>
          <StyledButton type="primary" ghost onClick={handlePreviousClick}>
            이전
          </StyledButton>
          <StyledButton
            type="primary"
            disabled={!isValid}
            data-testid="room-next-button"
            htmlType="submit"
          >
            {buttonStyle === 'register' ? '등록 요청' : '수정 요청'}
          </StyledButton>
        </>
      )}
    </StyledWrapper>
  );
};

export const StyledWrapper = styled.div<ButtonContainerStyledWrapperProps>`
  width: 100%;

  display: ${(props) =>
    props.$buttonStyle === 'register' || props.$buttonStyle === 'edit'
      ? 'grid'
      : 'block'};
  grid-template-columns: ${(props) =>
    props.$buttonStyle === 'register'
      ? '1fr 2.5fr'
      : props.$buttonStyle === 'edit'
        ? 'auto'
        : 'none'};
  gap: ${(props) => (props.$buttonStyle === 'register' ? '10px' : '0')};
`;

export const StyledButton = styled(Button)`
  height: 62px;
  font-size: 20px;
`;
