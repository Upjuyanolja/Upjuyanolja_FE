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
  imageFileState,
  addedImageFileState,
  deletedImageFileState,
} from '@stores/room/atoms';
import { RoomUpdateData, Image } from '@api/room/type';
import { useGetRoomDetail, useUpdateRoom } from '@queries/room';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { RoomImageOptions } from '@components/room/type';
import { useImageFile } from '@queries/init';
import { ImageFile } from '@stores/room/type';
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

  const [defaultValue, setDefaultValue] = useState<RoomImageOptions>({
    images: undefined,
    options: undefined,
  });

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
      const imageObjects = data.images.map((image) => ({ url: image.url }));
      form.setFieldsValue({
        'room-name': data.name,
        price: data.price.toString(),
        defaultCapacity: data.defaultCapacity,
        maxCapacity: data.maxCapacity,
        checkInTime: moment(data.checkInTime, 'HH:mm'),
        checkOutTime: moment(data.checkOutTime, 'HH:mm'),
        count: data.count,
      });
      setDefaultValue({
        images: imageObjects,
        options: data.options,
      });
    }
  }, [data, isLoading, error, form]);

  const { mutate: updateRoom } = useUpdateRoom(roomId as string, {
    onSuccess() {
      message.success({
        content: '수정되었습니다',
        className: 'coupon-message',
      });
      navigate(`/${accommodationId}${ROUTES.ROOM}`);
      //setSelectedRoomFiles([]);
      setSelectedRoomOptions({
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

  const [imageFile, setImageFile] = useRecoilState(imageFileState);
  const [addedImageFile, setAddedImageFile] =
    useRecoilState(addedImageFileState);
  const [deletedImageFile, setDeletedImageFile] = useRecoilState(
    deletedImageFileState,
  );
  const [selectedOptions, setSelectedRoomOptions] =
    useRecoilState(checkedRoomOptions);

  const { mutate: getImageUrl } = useImageFile({
    onSuccess(data) {
      const roomName = form.getFieldValue('room-name');
      const price = parseInt(form.getFieldValue('price').replace(',', ''));
      const defaultCapacity = form.getFieldValue('defaultCapacity');
      const maxCapacity = form.getFieldValue('maxCapacity');
      const checkInTime = form.getFieldValue('checkInTime').format('HH:mm');
      const checkOutTime = form.getFieldValue('checkOutTime').format('HH:mm');
      const count = form.getFieldValue('count');

      const updatedRoomData: RoomUpdateData = {
        name: roomName,
        price: price,
        defaultCapacity: defaultCapacity,
        maxCapacity: maxCapacity,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        status: 'STOP_SELLING',
        amount: count,
        addImages: addedImageFile,
        removeImages: deletedImageFile,
        options: selectedOptions,
      };

      updateRoom(updatedRoomData);
    },
  });

  const onFinish = () => {
    const formData = new FormData();

    let shouldExecuteImageFile = false;

    for (let i = 0; i < imageFile.length; i++) {
      const image = imageFile[i];
      if (image.file) shouldExecuteImageFile = true;
    }

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
      !form.getFieldsError().some(({ errors }) => errors.length) && conditions
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [form, imageFile, selectedOptions]);

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
        <ImageUploadContainer header="객실 사진" images={defaultValue.images} />
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
          <CheckBoxContainer
            options={roomOptions}
            header="객실"
            defaultValue={defaultValue.options}
          />
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
