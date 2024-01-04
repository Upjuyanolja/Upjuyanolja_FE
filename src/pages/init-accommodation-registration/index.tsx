import { ButtonContainer } from '@components/init-registration/ButtonContainer';
import { ItemTypography } from '@components/init-registration/ItemTypography';

export const InitAccommodationRegistration = () => {
  const isValid = false;
  return (
    <div
      style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px' }}
    >
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
    </div>
  );
};
