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
import { StatusContainer } from '@components/room/status-container';
import { useRecoilState } from 'recoil';
import {
  checkedRoomOptions,
  //selectedInitRoomFilesState,
} from '@stores/room/atoms';
import { RoomData } from '@api/room/type';
import { useGetRoomDetail } from '@queries/room';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@/constants/routes';
import { AxiosError } from 'axios';
import { getRoomDetailResolver } from 'src/mocks/room';

const RoomUpdate = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const { accommodationId = '', roomId = '' } = useParams<{
    accommodationId: string;
    roomId: string;
  }>();

  const shouldFetch = !!accommodationId && !!roomId;
  const roomDetailQuery = useGetRoomDetail(accommodationId, roomId, {
    enabled: shouldFetch,
  });

  const { data, isLoading, error } = roomDetailQuery;
  const [form] = Form.useForm();

  console.log(accommodationId, roomId, data);

  useEffect(() => {
    if (data && !isLoading && !error) {
      form.setFieldsValue({
        'room-name': data.name,
        price: data.price.toString(),
        defaultCapacity: data.defaultCapacity,
        maxCapacity: data.maxCapacity,
        checkInTime: moment(data.checkInTime, 'HH:mm'),
        checkOutTime: moment(data.checkOutTime, 'HH:mm'),
        count: data.count,
        selectedOptions: data.options,
      });
    }
  }, [data, isLoading, error, form]);

  // const { mutate: updateRoomDetail } = useUpdateRoomDetail(
  //   accommodationId as string,
  //   roomId as string,
  //   {
  //     onSuccess() {
  //       message.success({
  //         content: '수정되었습니다',
  //         className: 'coupon-message',
  //       });
  //       navigate(`/${accommodationId}${ROUTES.ROOM}`);
  //       //setSelectedRoomFiles([]);
  //       setSelectedRoomOptions({
  //         airCondition: false,
  //         tv: false,
  //         internet: false,
  //       });
  //     },
  //     onError(error) {
  //       if (error instanceof AxiosError)
  //         message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
  //     },
  //   },
  // );

  /*const [selectedImages, setSelectedRoomFiles] = useRecoilState(
    selectedInitRoomFilesState,
  );*/
  const [selectedOptions, setSelectedRoomOptions] =
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
      images: [],
    };
    //mutate(data);
  };

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();

    const conditions =
      values['room-name'] &&
      values['price'] &&
      values['checkInTime'] &&
      values['checkOutTime'];
    //selectedImages.length !== 0;

    return (
      !form.getFieldsError().some(({ errors }) => errors.length) && conditions
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [form, /*selectedImages, */ selectedOptions]);

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
        />
        <StyledCenterVertically>
          <StatusContainer />
        </StyledCenterVertically>
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
          <CheckBoxContainer options={selectedOptions} header="객실" />
        </StyledInputWrapper>
        <ButtonContainer buttonStyle={'update'} isValid={isValid} />
      </Form>
    </StyledWrapper>
  );
};

export default RoomUpdate;

const StyledWrapper = styled.div`
  border-radius: 8px;
  width: 100%;
  padding: 40px;
  background-color: ${(props) => props.color};
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;

const StyledCenterVertically = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0px;
`;
