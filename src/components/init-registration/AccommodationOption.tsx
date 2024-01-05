import { ItemTypography } from '@components/init/ItemTypography';
import { styled } from 'styled-components';

export const AccommodationOption = () => {
  return (
    <StyledInputWrapper>
      <ItemTypography text="숙소 옵션" labelName="accommodationOptions" />
      <div>내용</div>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;
