import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { Form, message } from 'antd';
import { ButtonContainer } from '@components/room/room-buttons';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { PriceContainer } from '@components/room/price-container';
import { CapacityContainer } from '@components/room/capacity-container';
import { CountContainer } from '@components/room/num-of-rooms-container';
import { TimeContainer } from '@components/room/time-container';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  checkedRoomOptions,
  //selectedInitRoomFilesState,
} from '@stores/init/atoms';
import { RoomData, onFinishValues } from '@api/room/type';
import { useAddRoom } from '@queries/room';
import { useNavigate, useParams } from 'react-router-dom';
import { capacityHasError, priceHasError } from '@stores/room/atoms';
import { useState, useEffect } from 'react';
import { ROUTES } from '@/constants/routes';
import { AxiosError } from 'axios';

const RoomRegistration = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const { accommodationId } = useParams();

  const [form] = Form.useForm();
  const { mutate } = useAddRoom(accommodationId as string, {
    onSuccess() {
      message.success({
        content:
          '객실 등록 요청 완료! 승인 결과는 24시간 이내에 확인 가능합니다.',
      });
      navigate(`/${accommodationId}${ROUTES.ROOM}`);
      //setSelectedImages([]);
      setSelectedOptions({
        airCondition: false,
        tv: false,
        internet: false,
      });
    },
    onError(error) {
      if (error instanceof AxiosError)
        message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
    },
  });

  /* const [selectedImages, setSelectedImages] = useRecoilState(
    selectedInitRoomFilesState,
  );*/
  const [selectedOptions, setSelectedOptions] =
    useRecoilState(checkedRoomOptions);

  const [sameRoomName, setSameRoomName] = useState(false);
  const [recoilUpdated, setRecoilUpdated] = useState(false);
  const priceError = useRecoilValue(priceHasError);
  const capacityError = useRecoilValue(capacityHasError);

  const onFinish = (value: onFinishValues) => {
    const data: RoomData = {
      name: value['room-name'],
      price: parseInt(value['price'].replace(',', '')),
      defaultCapacity: value.defaultCapacity,
      maxCapacity: value.maxCapacity,
      checkInTime: value['checkInTime'].format('HH:mm'),
      checkOutTime: value['checkOutTime'].format('HH:mm'),
      amount: value.count,
      options: selectedOptions,
      //images: selectedImages,
      images: [],
    };
    setRecoilUpdated(true);
    mutate(data);
  };

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();

    const conditions =
      values['room-name'] &&
      values['price'] &&
      values['checkInTime'] &&
      values['checkOutTime'] &&
      //selectedImages.length !== 0;

      console.log(
        values['room-name'],
        values['price'],
        values['checkInTime'],
        values['checkOutTime'],
        //selectedImages.length,
      );

    return (
      !form.getFieldsError().some(({ errors }) => errors.length) &&
      conditions &&
      !priceError &&
      !capacityError
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [
    form,
    //selectedImages,
    selectedOptions,
    priceError,
    capacityError,
    recoilUpdated,
  ]);

  const handleFormValuesChange = () => {
    setIsValid(areFormFieldsValid());
  };

  return (
    <StyledWrapper color={colors.white}>
      <Form
        form={form}
        onFinish={onFinish}
        onFieldsChange={handleFormValuesChange}
      >
        <NameContainer
          header="객실명"
          placeholder="객실명을 입력해 주세요. (ex. 디럭스 더블 룸)"
          form={form}
          //isSameRoomName={sameRoomName}
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
