import { colors } from '@/constants/colors';
import { ButtonContainer } from '@components/init-registration/ButtonContainer';
import { ItemTypography } from '@components/init-registration/ItemTypography';
import { styled } from 'styled-components';

export const InitAccommodationRegistration = () => {
  const isValid = false;
  return (
    <StyledWrapper color={colors.white}>
      <ItemTypography text="숙소 유형을 선택해 주세요." />
      <div>내용</div>
      <ItemTypography text="숙소명" />
      <div>내용</div>
      <ItemTypography text="숙소 위치" />
      <div>내용</div>
      <ItemTypography text="숙소 대표 이미지" />
      <div>내용</div>
      <ItemTypography text="숙소 옵션" />
      <div>내용</div>
      <ItemTypography text="숙소 소개" />
      <div>내용</div>
      <ButtonContainer buttonStyle={'navigate'} isValid={isValid} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: ${(props) => props.color};

  padding: 40px;

  border-radius: 8px;
`;
