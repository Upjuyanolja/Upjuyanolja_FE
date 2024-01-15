import { colors } from '@/constants/colors';
import { ROUTES } from '@/constants/routes';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import {
  Room,
  onFinishValues,
} from '@components/init/init-accommodation-registration/type';
import { CapacityContainer } from '@components/room/capacity-container';
import { CountContainer } from '@components/room/num-of-rooms-container';
import { PriceContainer } from '@components/room/price-container';
import { TimeContainer } from '@components/room/time-container';
import {
  checkedRoomOptions,
  isSameRoomName,
  selectedInitRoomFilesState,
  userInputValueState,
} from '@stores/init/atoms';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

export const InitRoomRegistration = () => {
  const [form] = Form.useForm();

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const setUserInputValueState = useSetRecoilState(userInputValueState);

  const selectedOptions = useRecoilValue(checkedRoomOptions);
  const selectedImages = useRecoilValue(selectedInitRoomFilesState);

  const userInputLocalStorage = localStorage.getItem('localStorage');

  const [sameRoomName, setSameRoomName] = useRecoilState(isSameRoomName);

  const onFinish = (values: onFinishValues) => {
    setUserInputValueState((prevUserInputValueState) => {
      const [userInputValue] = prevUserInputValueState;
      const [room] = userInputValue.rooms;

      const updatedRoom: Room = {
        ...room,
        name: values['room-name'],
        price: parseInt(values['price'].replace(',', '')),
        defaultCapacity: values['defaultCapacity'],
        maxCapacity: values['maxCapacity'],
        checkInTime: values['checkInTime'].format('HH:mm'),
        checkOutTime: values['checkOutTime'].format('HH:mm'),
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

    if (userInputLocalStorage !== null) {
      const parsedData = JSON.parse(userInputLocalStorage);
      const roomsArray = parsedData?.userInputValueState[0]?.rooms;

      if (roomsArray.length !== 0) {
        roomsArray.map((room: Room) => {
          if (room.name === form.getFieldValue('room-name')) {
            setSameRoomName(true);
            message.error('동일한 객실명의 상품이 이미 존재합니다.');
          } else {
            setSameRoomName(false);
            navigate(ROUTES.INIT_INFO_CONFIRMATION);
          }
        });
      }
    }
  };

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();

    const conditions =
      values['room-name'] &&
      values['price'] &&
      values['checkInTime'] &&
      values['checkOutTime'] &&
      selectedImages.length !== 0;

    return (
      !form.getFieldsError().some(({ errors }) => errors.length) && conditions
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [form, selectedImages, selectedOptions]);

  const handleFormValuesChange = () => {
    setIsValid(areFormFieldsValid());
  };

  return (
    <StyledWrapper>
      <Form
        form={form}
        onFinish={onFinish}
        onFieldsChange={handleFormValuesChange}
      >
        <NameContainer
          header="객실명"
          form={form}
          placeholder="객실명을 입력해 주세요. (ex. 디럭스 더블 룸)"
          isSameRoomName={sameRoomName}
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
