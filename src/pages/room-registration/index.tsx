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
import { useRecoilState } from 'recoil';
import {
  checkedRoomOptions,
  selectedInitRoomFilesState,
} from '@stores/init/atoms';
import { RoomData } from '@api/room/type';
import { useAddRoom } from '@queries/room';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { AxiosError } from 'axios';

const RoomRegistration = () => {
  const [isValid, setIsValid] = useState(true);

  const handlePriceValidation = (valid: boolean) => {
    setIsValid(valid);
  };
  const handleTimeValidation = (valid: boolean) => {
    setIsValid(valid);
  };

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const { accommodationId } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { mutate } = useAddRoom(accommodationId as string, {
    onSuccess() {
      message.success({
        content: '등록되었습니다',
        className: 'coupon-message',
      });
      navigate(`/${accommodationId}${ROUTES.ROOM}`);
      setSelectedInitRoomFiles([]);
      setSelectedInitRoomOptions({
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

  const [selectedImages, setSelectedInitRoomFiles] = useRecoilState(
    selectedInitRoomFilesState,
  );
  const [selectedOptions, setSelectedInitRoomOptions] =
    useRecoilState(checkedRoomOptions);

  const onFinish = (value: any) => {
    const data: RoomData = {
      name: value['room-name'],
      price: parseInt(value['price'].replace(',', '')),
      defaultCapacity: value.defaultCapacity,
      maxCapacity: value.maxCapacity,
      checkInTime: value['checkInTime'].format('HH:mm'),
      checkOutTime: value['checkOutTime'].format('HH:mm'),
      amount: value.count,
      options: selectedOptions,
      images: selectedImages,
    };
    mutate(data);
  };

  return (
    <StyledWrapper color={colors.white}>
      <Form form={form} onFinish={onFinish}>
        <NameContainer
          header="객실명"
          placeholder="객실명을 입력해 주세요. (ex. 디럭스 더블 룸)"
          form={form}
        />
        <StyledInputWrapper>
          <PriceContainer
            header="객실 가격"
            form={form}
            onValidate={handlePriceValidation}
          />
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
