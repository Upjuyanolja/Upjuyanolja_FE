import { ItemTypography } from './ItemTypography';
import { styled } from 'styled-components';

export const AccommodationImage = () => {
  return (
    <StyledInputWrapper>
      <ItemTypography text="숙소 대표 이미지" labelName="accommodationImages" />
      <div>내용</div>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;
