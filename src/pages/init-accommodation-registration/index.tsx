import { colors } from '@/constants/colors';
import { ButtonContainer } from '@components/init-registration/ButtonContainer';
import { styled } from 'styled-components';
import { AccommodationCategory } from '@components/init-registration/AccommodationCategory';
import { AccommodationName } from '@components/init-registration/AccommodationName';
import { AccommodationAddress } from '@components/init-registration/AccommodationAddress';
import { AccommodationImage } from '@components/init-registration/AccommodationImage';
import { AccommodationOption } from '@components/init-registration/AccommodationOption';
import { AccommodationDesc } from '@components/init-registration/AccommodationDesc';
import { Form } from 'antd';

export const InitAccommodationRegistration = () => {
  const isValid = true;

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
        <AccommodationImage />
        {/*숙소 옵션 */}
        <AccommodationOption />
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
