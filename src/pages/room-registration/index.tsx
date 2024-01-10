import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { Form } from 'antd';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { PriceContainer } from '@components/room/price-container';
import { CapacityContainer } from '@components/room/capacity-container';
import { NumOfRoomsContainer } from '@components/room/num-of-rooms-container';
import { TimeContainer } from '@components/room/time-container';

const RoomRegistration = () => {
  const isValid = true;
  const roomOptions = ['TV', '에어컨', '인터넷'];

  return (
    <StyledWrapper color={colors.white}>
      <Form>
        <NameContainer header="객실명" />
        <StyledInputWrapper>
          <PriceContainer header="객실 가격" />
        </StyledInputWrapper>
        <ImageUploadContainer header="객실 사진" />
        <StyledInputWrapper>
          <NumOfRoomsContainer header="객실 수" />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <TimeContainer header="시간" />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <CapacityContainer header="인원" />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <CheckBoxContainer options={roomOptions} header="객실 옵션" />
        </StyledInputWrapper>
        <ButtonContainer buttonStyle={'navigate'} isValid={isValid} />
      </Form>
    </StyledWrapper>
  );
};

export default RoomRegistration;

const StyledWrapper = styled.div`
  border-radius: 8px;
  padding: 40px;
  width: 100%;
  background-color: ${(props) => props.color};
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;
