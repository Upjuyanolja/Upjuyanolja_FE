import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { AccommodationCategory } from '@components/init/init-accommodation-registration/AccommodationCategory';
import { AccommodationAddress } from '@components/init/init-accommodation-registration/AccommodationAddress';
import { AccommodationDesc } from '@components/init/init-accommodation-registration/AccommodationDesc';
import { Form } from 'antd';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { useEffect, useState } from 'react';
import {
  checkedAccommodationOptions,
  descErrorMessage,
  isUploadedImage,
  nameErrorMessage,
  selectedAccommodationFilesState,
  userInputValueState,
} from '@stores/init/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { formValues } from '@components/init/init-accommodation-registration/type';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

export const InitAccommodationRegistration = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const [form] = Form.useForm();

  const accommodationOptions = {
    cooking: '객실취사',
    parking: '주차시설',
    pickup: '픽업 서비스',
    barbecue: '바베큐장',
    fitness: '휘트니스센터',
    karaoke: '노래방',
    sports: '스포츠 시설',
    sauna: '사우나실',
    seminar: '세미나실',
  };

  const setUserInputValueState = useSetRecoilState(userInputValueState);

  const selectedOptions = useRecoilValue(checkedAccommodationOptions);
  const selectedImages = useRecoilValue(selectedAccommodationFilesState);

  const onFinish = (values: formValues) => {
    setUserInputValueState((prevUserInputValueState) => {
      const [userInputValue] = prevUserInputValueState;
      const updatedUserInputValue = {
        ...userInputValue,
        id: Math.floor(Math.random() * 1000000),
        type:
          values['accommodation-category'] === 'HOTEL/RESORT'
            ? values['accommodation-hotel-category']
            : values['accommodation-category'] === 'GUEST'
              ? values['accommodation-guest-category']
              : values['accommodation-category'],
        name: values['accommodation-name'],
        address: values['accommodation-address'],
        detailAddress: values['accommodation-detailAddress'],
        description: values['accommodation-desc'],
        options: selectedOptions,
        images: selectedImages,
      };
      return [updatedUserInputValue];
    });

    navigate(ROUTES.INIT_ROOM_REGISTRATION);
  };

  const accommodationNameErrorMessage = useRecoilValue(nameErrorMessage);
  const accommodationDescErrorMessage = useRecoilValue(descErrorMessage);

  const uploadedImage = useRecoilValue(isUploadedImage);

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();
    const isNameValid = !accommodationNameErrorMessage;
    const isDescValid = !accommodationDescErrorMessage;
    const commonConditions =
      values['accommodation-category'] &&
      values['accommodation-desc'] &&
      values['accommodation-postCode'] &&
      isDescValid &&
      isNameValid &&
      values['accommodation-detailAddress'] &&
      values['accommodation-name'] &&
      isUploadedImage;

    const hotelResortConditions =
      values['accommodation-category'] === 'HOTEL/RESORT' &&
      values['accommodation-hotel-category'];
    const guestConditions =
      values['accommodation-category'] === 'GUEST' &&
      values['accommodation-guest-category'];

    return commonConditions && (hotelResortConditions || guestConditions);
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [
    form,
    uploadedImage,
    accommodationNameErrorMessage,
    accommodationDescErrorMessage,
    selectedOptions,
  ]);

  const handleFormValuesChange = () => {
    setIsValid(areFormFieldsValid());
  };

  return (
    <StyledWrapper color={colors.white}>
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={handleFormValuesChange}
      >
        <AccommodationCategory form={form} />
        <NameContainer
          header="숙소명"
          placeholder="숙소명을 입력해 주세요."
          form={form}
        />
        <AccommodationAddress form={form} />
        <ImageUploadContainer header="숙소 대표 이미지 설정" />
        <CheckBoxContainer options={accommodationOptions} header="숙소" />
        <AccommodationDesc />
        <ButtonContainer buttonStyle={'navigate'} isValid={isValid} />
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: ${(props) => props.color};

  padding: 40px;

  border-radius: 8px;
`;
