import { Button } from 'antd';
import { styled } from 'styled-components';

export const ButtonContainer = ({
  buttonStyle,
  isValid,
}: {
  buttonStyle: 'navigate' | 'request' | 'edit';
  isValid: boolean;
}) => {
  return (
    <StyledWrapper buttonStyle={buttonStyle}>
      {buttonStyle === 'navigate' && (
        <>
          <StyledButton type="primary" ghost>
            이전
          </StyledButton>
          <StyledButton type="primary" disabled={isValid}>
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
        <StyledButton type="primary" size="large" disabled={isValid}>
          수정하기
        </StyledButton>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{
  buttonStyle: 'navigate' | 'request' | 'edit';
}>`
  width: 100%;
  display: ${({ buttonStyle }) =>
    buttonStyle === 'navigate' || buttonStyle === 'edit' ? 'grid' : 'block'};
  grid-template-columns: ${({ buttonStyle }) =>
    buttonStyle === 'navigate'
      ? '1fr 2.5fr'
      : buttonStyle === 'edit'
        ? 'auto'
        : 'none'};
  gap: ${({ buttonStyle }) => (buttonStyle === 'navigate' ? '10px' : '0')};
`;

const StyledButton = styled(Button)`
  height: 62px;
  font-size: 20px;
`;
