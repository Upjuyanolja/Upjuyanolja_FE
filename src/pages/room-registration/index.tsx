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
import { RoomData, RoomErrorResponse } from '@api/room/type';
import { useAddRoom } from '@queries/room';
import { useNavigate, useParams } from 'react-router-dom';
import {
  capacityHasError,
  priceHasError,
  imageRoomFileState,
  checkedRoomDetailOptions,
} from '@stores/room/atoms';
import { useState, useEffect } from 'react';
import { ROUTES } from '@/constants/routes';
import { AxiosError } from 'axios';
import { useImageFile } from '@queries/init';
import { RESPONSE_CODE } from '@/constants/api';

const RoomRegistration = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [isSameRoomName, setIsSameRoomName] = useState(false);

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };
  const { accommodationId } = useParams();
  const { mutate: addRoom } = useAddRoom(accommodationId as string, {
    onSuccess() {
      message.success({
        content:
          '객실 등록 요청 완료! 승인 결과는 24시간 이내에 확인 가능합니다.',
      });
      navigate(`/${accommodationId}${ROUTES.ROOM}`);
      setSelectedOptions({
        airCondition: false,
        tv: false,
        internet: false,
      });
      setSelectedImageFile([]);
    },
    onError(error) {
      if (error instanceof AxiosError && error.message && error.response) {
        const errorData = error.response.data as RoomErrorResponse;
        if (errorData) {
          if (errorData.code === RESPONSE_CODE.DUPLICATE_ROOM_NAME) {
            setIsSameRoomName(true);
            message.error({
              content: '동일한 객실명의 상품이 이미 존재합니다.',
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
          }
        }
      }
    },
  });

  const { mutate: getImageUrl } = useImageFile({
    onSuccess(data) {
      const roomName = form.getFieldValue('room-name');
      const price = parseInt(form.getFieldValue('price').replace(',', ''));
      const defaultCapacity = form.getFieldValue('defaultCapacity');
      const maxCapacity = form.getFieldValue('maxCapacity');
      const checkInTime = form.getFieldValue('checkInTime').format('HH:mm');
      const checkOutTime = form.getFieldValue('checkOutTime').format('HH:mm');
      const count = form.getFieldValue('count');

      const newImage = [];
      for (let i = 0; i < data.data.urls.length; i++) {
        const { url } = data.data.urls[i];
        if (url) {
          newImage.push({ url });
        }
      }
      const roomData: RoomData = {
        name: roomName,
        price: price,
        defaultCapacity: defaultCapacity,
        maxCapacity: maxCapacity,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        amount: count,
        option: selectedOptions,
        images: newImage,
      };
      addRoom(roomData);

      setSelectedOptions({ airCondition: false, tv: false, internet: false });
      setSelectedImageFile([]);
    },
  });

  const [form] = Form.useForm();

  const [imageFile, setSelectedImageFile] = useRecoilState(imageRoomFileState);
  const [selectedOptions, setSelectedOptions] = useRecoilState(
    checkedRoomDetailOptions,
  );

  const priceError = useRecoilValue(priceHasError);
  const capacityError = useRecoilValue(capacityHasError);

  const onFinish = () => {
    const formData = new FormData();
    setIsSameRoomName(false);

    for (let index = 0; index < 5; index++) {
      const image = imageFile[index];
      if (!image || image.file === null) {
        // 등록한 적이 있거나 이미지 자체를 등록하지 않은 순서
        const emptyBlob = new Blob([], { type: 'application/octet-stream' });
        const nullFile = new File([emptyBlob], 'nullFile.txt', {
          type: 'text/plain',
        });
        formData.append(`image${index + 1}`, nullFile);
      } else {
        formData.append(`image${index + 1}`, image.file);
      }
    }

    getImageUrl(formData);
  };

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();

    const conditions =
      values['room-name'] &&
      values['price'] &&
      values['checkInTime'] &&
      values['checkOutTime'] &&
      imageFile.length !== 0;

    return (
      !form.getFieldsError().some(({ errors }) => errors.length) &&
      conditions &&
      !priceError &&
      !capacityError
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [form, imageFile, priceError, capacityError]);

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
          isSameRoomName={isSameRoomName}
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
