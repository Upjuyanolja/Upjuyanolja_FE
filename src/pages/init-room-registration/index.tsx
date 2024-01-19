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
import { useImageFile } from '@queries/init';
import {
  checkedRoomOptions,
  imageFileState,
  userInputValueState,
} from '@stores/init/atoms';
import { capacityHasError, priceHasError } from '@stores/room/atoms';
import { Form, message } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Image } from '@api/room/type';

export const InitRoomRegistration = () => {
  const [form] = Form.useForm();

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);

  const [selectedOptions, setSelectedOptions] =
    useRecoilState(checkedRoomOptions);

  const [imageFiles, setImageFiles] = useRecoilState(imageFileState);

  const [sameRoomName, setSameRoomName] = useState(false);
  const priceError = useRecoilValue(priceHasError);
  const capacityError = useRecoilValue(capacityHasError);

  const { mutate: imageFile } = useImageFile({
    onSuccess(data) {
      setUserInputValue((prevUserInputValueState) => {
        const [userInputValue] = prevUserInputValueState;

        const roomName = form.getFieldValue('room-name');
        const price = parseInt(form.getFieldValue('price').replace(',', ''));
        const defaultCapacity = form.getFieldValue('defaultCapacity');
        const maxCapacity = form.getFieldValue('maxCapacity');
        const checkInTime = form.getFieldValue('checkInTime').format('HH:mm');
        const checkOutTime = form.getFieldValue('checkOutTime').format('HH:mm');
        const count = form.getFieldValue('count');

        const updatedRoom: Room = {
          name: roomName,
          price: price,
          defaultCapacity: defaultCapacity,
          maxCapacity: maxCapacity,
          checkInTime: checkInTime,
          checkOutTime: checkOutTime,
          count: count,
          options: selectedOptions,
          images: data.data.data.urls as unknown as Image[],
        };

        const updatedUserInputValue = {
          ...userInputValue,
          rooms: [...userInputValue.rooms, updatedRoom],
        };

        return [updatedUserInputValue];
      });
      setSelectedOptions({ airCondition: false, tv: false, internet: false });
      setImageFiles([]);
      navigate(ROUTES.INIT_INFO_CONFIRMATION);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        message.error({
          content: '요청에 실패했습니다. 잠시 후 다시 시도해주세요',
          style: { marginTop: '210px' },
        });
      }
    },
  });

  const onFinish = (values: onFinishValues) => {
    const roomsArray = userInputValue[0].rooms;

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

    const formData = new FormData();

    imageFiles.forEach((image) => {
      formData.append('image1', image);
    });

    imageFile(formData);

    setSameRoomName(false);
  };

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();

    const conditions =
      values['room-name'] &&
      values['price'] &&
      values['checkInTime'] &&
      values['checkOutTime'] &&
      imageFiles.length !== 0;

    return (
      !form.getFieldsError().some(({ errors }) => errors.length) &&
      conditions &&
      !priceError &&
      !capacityError
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [selectedOptions, priceHasError, capacityError]);

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

  margin-top: 204px;
`;
