import { colors } from '@/constants/colors';
import { ROUTES } from '@/constants/routes';
import { ButtonContainer } from '@components/domain/init/ButtonContainer';
import { CheckBoxContainer } from '@components/domain/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/domain/init/ImageUploadContainer';
import { NameContainer } from '@components/domain/init/NameContainer';
import {
  Room,
  defaultRoom,
} from '@components/domain/init/init-accommodation-registration/type';
import { CapacityContainer } from '@components/domain/room/capacity-container';
import { CountContainer } from '@components/domain/room/num-of-rooms-container';
import { PriceContainer } from '@components/domain/room/price-container';
import { TimeContainer } from '@components/domain/room/time-container';
import { useImageFile } from '@queries/init';
import {
  addRoomState,
  checkedRoomOptions,
  imageFileState,
  isUpdatedAccommodationState,
  isUpdatedRoomState,
  userInputValueState,
} from '@stores/init/atoms';
import { capacityHasError, priceHasError } from '@stores/room/atoms';
import { Button, Form, Modal, message } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { TextBox } from '@components/atom/text-box';
import moment from 'moment';
import { RESPONSE_CODE } from '@/constants/api';

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

  const isUpdatedAccommodation = useRecoilValue(isUpdatedAccommodationState);

  const [isAddRoom, setIsAddRoom] = useRecoilState(addRoomState);

  const [isUpdatedRoom, setIsUpdatedRoom] = useRecoilState(isUpdatedRoomState);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (
      userInputValue[0].editRoomIndex !== undefined &&
      userInputValue[0].editRoomIndex !== -1
    ) {
      const index = userInputValue[0].editRoomIndex;
      form.setFieldValue('room-name', userInputValue[0].rooms[index].name);
      form.setFieldValue(
        'price',
        userInputValue[0].rooms[index].price?.toLocaleString(),
      );
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
    } else if (
      isUpdatedAccommodation &&
      isUpdatedRoom &&
      !isAddRoom &&
      userInputValue[0].editRoomIndex === -1
    ) {
      navigate(ROUTES.INIT_INFO_CONFIRMATION);
      setIsUpdatedRoom(false);
    }
  }, []);

  const resetStateAndNavigate = () => {
    if (
      userInputValue[0].editRoomIndex !== undefined &&
      userInputValue[0].editRoomIndex !== -1
    ) {
      message.success('수정되었습니다.');
    }

    setSelectedOptions({ airCondition: false, tv: false, internet: false });
    setImageFiles([]);
    setSameRoomName(false);
    setIsAddRoom(false);
    if (userInputValue[0].editRoomIndex !== -1) {
      setUserInputValue((prev) => [{ ...prev[0], editRoomIndex: -1 }]);
    }
    navigate(ROUTES.INIT_INFO_CONFIRMATION);
  };

  const { mutate: imageFile } = useImageFile({
    onSuccess(data) {
      setUserInputValue((prevUserInputValueState) => {
        const [prevUserInputValue] = prevUserInputValueState;

        const roomName = form.getFieldValue('room-name');
        const price = parseInt(form.getFieldValue('price').replace(',', ''));
        const defaultCapacity = form.getFieldValue('defaultCapacity');
        const maxCapacity = form.getFieldValue('maxCapacity');
        const checkInTime = form.getFieldValue('checkInTime').format('HH:mm');
        const checkOutTime = form.getFieldValue('checkOutTime').format('HH:mm');
        const count = form.getFieldValue('count');

        const newImages = [];

        const urls = data.data.urls;
        for (let i = 0; i < imageFiles.length; i++) {
          const image = imageFiles[i];
          if (image.url !== '') {
            newImages.push({ url: image.url });
          }
        }

        for (let i = 0; i < urls.length; i++) {
          const url = urls[i].url;
          if (typeof url === 'string') {
            newImages.push({ url });
          }
        }

        const updatedRoom: Room = {
          name: roomName,
          price: price,
          defaultCapacity: defaultCapacity,
          maxCapacity: maxCapacity,
          checkInTime: checkInTime,
          checkOutTime: checkOutTime,
          count: count,
          options: selectedOptions,
          images: newImages,
        };

        const updatedRooms = [...prevUserInputValue.rooms];

        if (
          userInputValue[0].editRoomIndex !== undefined &&
          userInputValue[0].editRoomIndex !== -1
        ) {
          updatedRooms[userInputValue[0].editRoomIndex] = updatedRoom;
        } else {
          updatedRooms.push(updatedRoom);
        }

        const updatedUserInputValue = {
          ...prevUserInputValue,
          rooms: updatedRooms,
        };

        return [updatedUserInputValue];
      });

      resetStateAndNavigate();
    },
    onError(error) {
      if (error instanceof AxiosError) {
        message.error({
          content: '요청에 실패했습니다. 잠시 후 다시 시도해주세요',
          style: { marginTop: '64px' },
        });
      }
      if (error.response?.data.code === RESPONSE_CODE.IMAGE_SAVE_FAIL) {
        message.error({
          content: '요청을 실패했습니다. 관리자에게 문의해주세요',
          style: { marginTop: '64px' },
        });
      }
    },
  });

  const onFinish = () => {
    const roomsArray = userInputValue[0].rooms;
    const roomNameValue = form.getFieldValue('room-name');
    const hasDuplicate = roomsArray.some(
      (room: Room) => room.name === roomNameValue,
    );

    const editHasDuplicate = roomsArray.some(
      (room, index) =>
        index !== userInputValue[0].editRoomIndex &&
        room.name === roomNameValue,
    );

    if (
      (hasDuplicate && userInputValue[0].editRoomIndex == -1) ||
      editHasDuplicate
    ) {
      setSameRoomName(true);
      message.error({
        content: '동일한 객실명의 상품이 이미 존재합니다.',
        style: { marginTop: '64px' },
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const formData = new FormData();

    let shouldExecuteImageFile = false;

    for (let i = 0; i < imageFiles.length; i++) {
      const image = imageFiles[i];
      if (image.file) shouldExecuteImageFile = true;
    }

    for (let index = 0; index < 5; index++) {
      const image = imageFiles[index];
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

    if (shouldExecuteImageFile) {
      imageFile(formData); //그 파일에 대한 url을 가져와서, setUserInputValue까지 한번에 해줌.
    } else {
      setUserInputValue((prevUserInputValueState) => {
        const [prevUserInputValue] = prevUserInputValueState;

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
          images: imageFiles,
        };

        const updatedRooms = [...prevUserInputValue.rooms];

        if (
          userInputValue[0].editRoomIndex !== undefined &&
          userInputValue[0].editRoomIndex !== -1
        ) {
          updatedRooms[userInputValue[0].editRoomIndex] = updatedRoom;
        } else {
          updatedRooms.push(updatedRoom);
        }

        const updatedUserInputValue = {
          ...prevUserInputValue,
          rooms: updatedRooms,
        };

        return [updatedUserInputValue];
      });

      resetStateAndNavigate();
    }
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
  }, [imageFiles, priceError, capacityError]);

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
            userInputValue[0].editRoomIndex !== -1 &&
            userInputValue[0].editRoomIndex !== undefined
              ? 'edit'
              : isAddRoom
                ? 'addRoom'
                : 'navigate'
          }
          isValid={isValid}
        />
      </Form>
      <Modal
        open={!isUpdatedAccommodation}
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
