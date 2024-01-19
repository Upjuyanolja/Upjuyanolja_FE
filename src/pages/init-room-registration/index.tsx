import { colors } from '@/constants/colors';
import { ROUTES } from '@/constants/routes';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import {
  Room,
  defaultRoom,
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
import { Button, Form, Modal, message } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Image } from '@api/room/type';
import { TextBox } from '@components/text-box';
import moment from 'moment';

export const InitRoomRegistration = () => {
  const [form] = Form.useForm();

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const navigate = useNavigate();

  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);

  /*버튼 비활성화 문제
    버튼 활성화 비활성화를 다루는 isValid의 초깃값을
    editRoomIndex가 없을 때 (-1일때) 는 false ,
    editRoomIndex 가 있을 땐 true
    */

  useEffect(() => {
    if (
      userInputValue[0].editRoomIndex !== undefined &&
      userInputValue[0].editRoomIndex !== -1
    ) {
      const index = userInputValue[0].editRoomIndex;
      form.setFieldValue('room-name', userInputValue[0].rooms[index].name);
      form.setFieldValue('price', userInputValue[0].rooms[index].price);
      form.setFieldValue(
        'defaultCapacity',
        userInputValue[0].rooms[index].defaultCapacity,
      );
      form.setFieldValue(
        'maxCapacity',
        userInputValue[0].rooms[index].maxCapacity,
      );
      form.setFieldValue('count', userInputValue[0].rooms[index].count);
      form.setFieldValue(
        'checkInTime',
        moment(userInputValue[0].rooms[index].checkInTime, 'HH:mm'),
      );
      form.setFieldValue(
        'checkOutTime',
        moment(userInputValue[0].rooms[index].checkOutTime, 'HH:mm'),
      );
      setDefaultValue({
        images: userInputValue[0].rooms[index].images,
        options: userInputValue[0].rooms[index].options,
      });
    }
  }, []);

  const [isValid, setIsValid] = useState(
    userInputValue[0].editRoomIndex !== -1,
  );
  const [selectedOptions, setSelectedOptions] =
    useRecoilState(checkedRoomOptions);

  const [imageFiles, setImageFiles] = useRecoilState(imageFileState);

  const [sameRoomName, setSameRoomName] = useState(false);

  const [defaultValue, setDefaultValue] = useState<defaultRoom>({
    images: undefined,
    options: undefined,
  });

  const priceError = useRecoilValue(priceHasError);
  const capacityError = useRecoilValue(capacityHasError);

  const userInput = window.localStorage.getItem('userInput');

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

  const handleEdit = () => {
    setUserInputValue([{ ...userInputValue[0], editRoomIndex: -1 }]);
    navigate('/init/info-confirmation');
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
        <ImageUploadContainer header="객실 사진" images={defaultValue.images} />
        <CountContainer header="객실 수" form={form} />
        <TimeContainer header="시간" form={form} />
        <CapacityContainer header="인원" form={form} />
        <CheckBoxContainer
          options={roomOptions}
          header="객실"
          defaultValue={defaultValue.options}
        />
        <ButtonContainer
          buttonStyle={
            userInputValue[0].editRoomIndex !== -1 ? 'edit' : 'navigate'
          }
          isValid={isValid}
          handleEdit={handleEdit}
        />
      </Form>
      <Modal
        open={userInput === null}
        footer={[]}
        closable={false}
        centered={true}
        width={430}
      >
        <StyledModalWrapper>
          <TextBoxWrapper>
            <TextBox typography="h4" fontWeight={700}>
              숙소를 먼저 등록해주세요!
            </TextBox>
            <StyledTextBox typography="h5">
              버튼을 누르면 숙소 등록 페이지로 이동합니다.
            </StyledTextBox>
          </TextBoxWrapper>
          <StyledButton
            type="primary"
            onClick={() => navigate(ROUTES.INIT_ACCOMMODATION_REGISTRATION)}
          >
            확인
          </StyledButton>
        </StyledModalWrapper>
      </Modal>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: ${colors.white};

  padding: 40px;

  border-radius: 8px;

  margin-top: 204px;
`;

const StyledModalWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: center;
  flex-direction: column;

  padding: 20px 0 0;
`;

const TextBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const StyledTextBox = styled(TextBox)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  height: 40px;
  width: 360px;

  font-size: 20px;
  font-weight: 700;
`;
