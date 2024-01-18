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
  selectedInitRoomFilesState,
  userInputValueState,
} from '@stores/init/atoms';
import { capacityHasError, priceHasError } from '@stores/room/atoms';
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

  const [selectedOptions, setSelectedOptions] =
    useRecoilState(checkedRoomOptions);
  const [selectedImages, setSelectedImages] = useRecoilState(
    selectedInitRoomFilesState,
  );

  const userInputLocalStorage = localStorage.getItem('userInput');

  const [sameRoomName, setSameRoomName] = useState(false);
  const [recoilUpdated, setRecoilUpdated] = useState(false);
  const priceError = useRecoilValue(priceHasError);
  const capacityError = useRecoilValue(capacityHasError);

  const onFinish = (values: onFinishValues) => {
    if (userInputLocalStorage !== null) {
      const parsedData = JSON.parse(userInputLocalStorage);
      const roomsArray = parsedData?.userInputValueState[0]?.rooms;

      const hasDuplicate = roomsArray.some(
        (room: Room) => room.name === values['room-name'],
      );

      if (hasDuplicate) {
        setSameRoomName(true);
        message.error({
          content: '동일한 객실명의 상품이 이미 존재합니다.',
          style: { marginTop: '210px' },
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setUserInputValueState((prevUserInputValueState) => {
        const [userInputValue] = prevUserInputValueState;

        const updatedRoom: Room = {
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
          rooms: [...userInputValue.rooms, updatedRoom],
        };

        return [updatedUserInputValue];
      });

      setRecoilUpdated(true);
      setSameRoomName(false);
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
      !form.getFieldsError().some(({ errors }) => errors.length) &&
      conditions &&
      !priceError &&
      !capacityError
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [selectedImages, selectedOptions, priceHasError, capacityError]);

  useEffect(() => {
    if (recoilUpdated && sameRoomName === false) {
      setRecoilUpdated(false);
      setSelectedImages([]);
      setSelectedOptions({ airCondition: false, tv: false, internet: false });
      navigate(ROUTES.INIT_INFO_CONFIRMATION);
    }
  }, [recoilUpdated, sameRoomName]);

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
