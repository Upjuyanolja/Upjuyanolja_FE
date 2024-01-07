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
      {buttonStyle === 'navigate' && (
        <>
          <StyledButton type="primary" ghost onClick={handlePreviousClick}>
            이전
          </StyledButton>
          <StyledButton type="primary" disabled={!isValid}>
            다음
          </StyledButton>
        </>
      )}
      {buttonStyle === 'request' && (
        <StyledButton type="primary" size="large">
          등록하기
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

export const StyledWrapper = styled.div<ButtonContainerStyledWrapperProps>`
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

export const StyledButton = styled(Button)`
  height: 62px;
  font-size: 20px;
`;
