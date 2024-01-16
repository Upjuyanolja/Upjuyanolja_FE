import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { Form } from 'antd';
import { ButtonContainer } from '@components/room/room-buttons';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { PriceContainer } from '@components/room/price-container';
import { CapacityContainer } from '@components/room/capacity-container';
import { CountContainer } from '@components/room/num-of-rooms-container';
import { TimeContainer } from '@components/room/time-container';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { RoomData } from '@api/room/type';
import { useAddRoom } from '@queries/room';
//import { getRoomData } from '@hooks/room/useAddRoom';

const RoomRegistration = () => {
  const isValid = true;
  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const [form] = Form.useForm();

  const onFinish = useAddRoom({
    onSuccess: (response) => {
      console.log(response);
    },
  });
  // async (formData: RoomData) => {
  //   try {
  //     //postRoomData(formData);
  //     //const res = await axios.post('', formData);
  //     const res = useAddRoom;
  //     console.log('Success:', res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <StyledWrapper color={colors.white}>
      <Form form={form}>
        <NameContainer
          header="객실명"
          placeholder="객실명을 입력해 주세요. (ex. 디럭스 더블 룸)"
          form={form}
        />
        <StyledInputWrapper>
          <PriceContainer header="객실 가격" form={form} />
        </StyledInputWrapper>
        <ImageUploadContainer header="객실 사진" />
        <StyledInputWrapper>
          <CountContainer header="객실 수" form={form} />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <TimeContainer header="시간" form={form} />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <CapacityContainer header="인원" form={form} />
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
