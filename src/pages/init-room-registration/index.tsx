import { colors } from '@/constants/colors';
import { ROUTES } from '@/constants/routes';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { Room } from '@components/init/init-accommodation-registration/type';
import { CapacityContainer } from '@components/room/capacity-container';
import { CountContainer } from '@components/room/num-of-rooms-container';
import { PriceContainer } from '@components/room/price-container';
import { TimeContainer } from '@components/room/time-container';
import {
  checkedRoomOptions,
  selectedInitRoomFilesState,
  userInputValueState,
} from '@stores/init/atoms';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

export const InitRoomRegistration = () => {
  const [form] = Form.useForm();
  const isValid = true;

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const navigate = useNavigate();

  const setUserInputValueState = useSetRecoilState(userInputValueState);

  const selectedOptions = useRecoilValue(checkedRoomOptions);
  const selectedImages = useRecoilValue(selectedInitRoomFilesState);

  const onFinish = (values: { [key: string]: any }) => {
    setUserInputValueState((prevUserInputValueState) => {
      const [userInputValue] = prevUserInputValueState;
      const [room] = userInputValue.rooms;

      const updatedRoom: Room = {
        ...room,
        name: values['room-name'],
        price: parseInt(values['price'].replace(',', '')),
        defaultCapacity: values['defaultCapacity'],
        maxCapacity: values['maxCapacity'],
        checkInTime: values['checkInTime'].format('hh:mm'),
        checkOutTime: values['checkOutTime'].format('hh:mm'),
        count: values['count'],
        options: selectedOptions,
        images: selectedImages,
      };

      const updatedUserInputValue = {
        ...userInputValue,
        rooms: [updatedRoom],
      };

      return [updatedUserInputValue];
    });

    navigate(ROUTES.INIT_INFO_CONFIRMATION);
  };

  return (
    <StyledWrapper>
      <Form form={form} onFinish={onFinish}>
        <NameContainer
          header="객실명"
          form={form}
          placeholder="객실명을 입력해 주세요. (ex. 디럭스 더블 룸)"
        />
        <PriceContainer header="객실 가격" form={form} />
        <ImageUploadContainer header="객실 사진" />
        <CountContainer header="객실 수" form={form} />
        <TimeContainer header="시간" form={form} />
        <CapacityContainer header="인원" form={form} />
        <CheckBoxContainer options={roomOptions} header="객실" />
        <ButtonContainer buttonStyle={'navigate'} isValid={isValid} />
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: ${colors.white};

  padding: 40px;

  border-radius: 8px;
`;
