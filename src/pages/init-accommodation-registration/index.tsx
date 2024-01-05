import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { AccommodationCategory } from '@components/init-registration/AccommodationCategory';
import { AccommodationName } from '@components/init-registration/AccommodationName';
import { AccommodationAddress } from '@components/init-registration/AccommodationAddress';
import { AccommodationDesc } from '@components/init-registration/AccommodationDesc';
import { Form } from 'antd';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';

export const InitAccommodationRegistration = () => {
  const isValid = true;

  const accommodationOptions = [
    '객실취사',
    '주차시설',
    '픽업 서비스',
    '바베큐장',
    '휘트니스센터',
    '노래방',
    '에어컨',
    '사우나실',
    '세미나실',
  ];

  return (
    <StyledWrapper color={colors.white}>
      {/*숙소 유형 선택 */}
      <AccommodationCategory />
      <Form>
        {/*숙소명 */}
        <AccommodationName />
        {/*숙소 주소 */}
        <AccommodationAddress />
        {/*숙소 대표 이미지 */}
        <ImageUploadContainer />
        {/*숙소 옵션 */}
        <StyledInputWrapper>
          <CheckBoxContainer options={accommodationOptions} label="숙소 옵션" />
        </StyledInputWrapper>
        {/*숙소 소개 */}
        <AccommodationDesc />
        {/*버튼 */}
        <ButtonContainer buttonStyle={'navigate'} isValid={isValid} />
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: ${(props) => props.color};

  padding: 40px;

  border-radius: 8px;
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;
