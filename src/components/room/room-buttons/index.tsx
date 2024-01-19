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
      {
        <>
          <StyledButton type="primary" ghost onClick={handlePreviousClick}>
            이전
          </StyledButton>
          <StyledButton type="primary" disabled={!isValid} htmlType="submit">
            {buttonStyle === 'register' ? '등록 요청' : '수정 완료'}
          </StyledButton>
        </>
      }
    </StyledWrapper>
  );
};

export const StyledWrapper = styled.div<ButtonContainerStyledWrapperProps>`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 2.5fr;
  gap: 10px;
`;

export const StyledButton = styled(Button)`
  height: 62px;
  font-size: 20px;
`;
