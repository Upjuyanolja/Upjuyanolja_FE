import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { Form } from 'antd';
import { ButtonContainer } from '@components/room/room-buttons';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { PriceContainer } from '@components/room/price-container';
import { CapacityContainer } from '@components/room/capacity-container';
import { NumOfRoomsContainer } from '@components/room/num-of-rooms-container';
import { TimeContainer } from '@components/room/time-container';

const RoomRegistration = () => {
  const isValid = true;
  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const [form] = Form.useForm();

  return (
    <StyledWrapper color={colors.white}>
      <Form>
        <NameContainer
          header="객실명"
          placeholder="객실명을 입력해 주세요. (ex. 디럭스 더블 룸)"
          form={form}
        />
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
          <CheckBoxContainer options={roomOptions} header="객실" />
        </StyledInputWrapper>
        <ButtonContainer buttonStyle={'register'} isValid={isValid} />
      </Form>
    </StyledWrapper>
  );
};

export default RoomRegistration;

const StyledWrapper = styled.div`
  border-radius: 8px;
  width: 100%;
  padding: 40px;
  background-color: ${(props) => props.color};
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;
