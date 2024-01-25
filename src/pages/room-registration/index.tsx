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
import { RoomData } from '@api/room/type';
import { useAddRoom } from '@queries/room';
import { useNavigate, useParams } from 'react-router-dom';
import { capacityHasError, priceHasError } from '@stores/room/atoms';
import { imageFileState, checkedRoomOptions } from '@stores/init/atoms';
import { useState, useEffect } from 'react';
import { ROUTES } from '@/constants/routes';
import { AxiosError } from 'axios';
import { useImageFile } from '@queries/init';

const RoomRegistration = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

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
      if (error instanceof AxiosError)
        message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
    },
  });

  const { mutate: getImageUrl } = useImageFile({
    onSuccess() {
      const roomName = form.getFieldValue('room-name');
      const price = parseInt(form.getFieldValue('price').replace(',', ''));
      const defaultCapacity = form.getFieldValue('defaultCapacity');
      const maxCapacity = form.getFieldValue('maxCapacity');
      const checkInTime = form.getFieldValue('checkInTime').format('HH:mm');
      const checkOutTime = form.getFieldValue('checkOutTime').format('HH:mm');
      const count = form.getFieldValue('count');
      const newImages = [];
      for (let i = 0; i < imageFile.length; i++) {
        const image = imageFile[i];
        if (image && image.url !== null) {
          newImages.push({ url: image.url });
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
        images: newImages,
        option: selectedOptions,
        // images: data.data.urls as unknown as Image[],
      };
      console.log('roomData', roomData);
      addRoom(roomData);
    },
    onError(error) {
      console.log('errored', error);
    },
  });

  const [form] = Form.useForm();

  const [imageFile, setSelectedImageFile] = useRecoilState(imageFileState);
  const [selectedOptions, setSelectedOptions] =
    useRecoilState(checkedRoomOptions);

  const priceError = useRecoilValue(priceHasError);
  const capacityError = useRecoilValue(capacityHasError);

  const onFinish = () => {
    const formData = new FormData();

    //const newImages = [];

    for (let index = 0; index < imageFile.length; index++) {
      const image = imageFile[index];
      if (image && image.file) {
        console.log('this is image', image, 'this is imagefile', image.file);
        formData.append(`image${index + 1}`, image.file);
      }
    }
    console.log(formData);
    // for (let i = 0; i < urls.length; i++) {
    //   const image = imageFile[i];
    //   if (image.url !== '') {
    //     formData.append(`image${i + 1}`, image.file);
    //     //newImages.push({ url: image.url });
    //   }
    // }
    // for (let index = 0; index < 5; index++) {
    //   const image = imageFile[index];
    //   // if (!image || image.file === null) {
    //   //   const emptyBlob = new Blob([], { type: 'application/octet-stream' });
    //   //   const nullFile = new File([emptyBlob], 'nullFile.txt', {
    //   //     type: 'text/plain',
    //   //   });
    //   //   formData.append(`image${index + 1}`, nullFile);
    //   // } else {
    //   if (image && image.file !== null) {
    //     formData.append(`image${index + 1}`, image.file);
    //   }
    // }

    getImageUrl(formData);

    setSelectedOptions({ airCondition: false, tv: false, internet: false });
    setSelectedImageFile([]);
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
