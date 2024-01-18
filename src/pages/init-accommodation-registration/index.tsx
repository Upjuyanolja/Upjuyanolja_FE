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
  accommodationEditState,
  checkedAccommodationOptions,
  selectedAccommodationFilesState,
  userInputValueState,
} from '@stores/init/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { UserInputValue } from '@components/init/init-accommodation-registration/type';

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

  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);

  const selectedOptions = useRecoilValue(checkedAccommodationOptions);
  const selectedImages = useRecoilValue(selectedAccommodationFilesState);

  const isEditState = useRecoilValue(accommodationEditState);

  const changeValues = () => {
    setUserInputValue(() => {
      let type;
      switch (form.getFieldValue('accommodation-category')) {
        case 'HOTEL/RESORT':
          type = form.getFieldValue('accommodation-hotel-category');
          break;
        case 'GUEST_HOUSE':
          type = form.getFieldValue('accommodation-guest-category');
          break;
        default:
          type = form.getFieldValue('accommodation-category');
      }

      const updatedUserInputValue: UserInputValue = {
        type,
        name: form.getFieldValue('accommodation-name'),
        address: form.getFieldValue('accommodation-address'),
        detailAddress: form.getFieldValue('accommodation-detailAddress'),
        zipCode: form.getFieldValue('accommodation-postCode'),
        description: form.getFieldValue('accommodation-desc'),
        options: selectedOptions,
        images: selectedImages,
        rooms: [],
      };
      return [updatedUserInputValue];
    });
  };

  const onFinish = () => {
    changeValues();
    if (!isEditState) navigate(ROUTES.INIT_ROOM_REGISTRATION);
  };

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();

    const commonConditions =
      values['accommodation-postCode'] &&
      values['accommodation-detailAddress'] &&
      values['accommodation-name'] &&
      values['accommodation-desc'] &&
      values['accommodation-category'] &&
      selectedImages.length !== 0;

    const hotelResortConditions =
      values['accommodation-category'] === 'HOTEL/RESORT' &&
      values['accommodation-hotel-category'];
    const guestConditions =
      values['accommodation-category'] === 'GUEST_HOUSE' &&
      values['accommodation-guest-category'];

    return (
      (!form.getFieldsError().some(({ errors }) => errors.length) &&
        commonConditions &&
        hotelResortConditions) ||
      guestConditions
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [form, selectedImages, selectedOptions]);

  const handleFormValuesChange = () => {
    setIsValid(areFormFieldsValid());
  };

  useEffect(() => {
    if (isEditState) {
      form.setFieldValue('accommodation-name', userInputValue[0].name);
      form.setFieldValue('accommodation-postCode', userInputValue[0].zipCode);
      form.setFieldValue('accommodation-address', userInputValue[0].address);
      form.setFieldValue(
        'accommodation-detailAddress',
        userInputValue[0].detailAddress,
      );
      form.setFieldValue('accommodation-desc', userInputValue[0].description);
    }
  }, [isEditState]);

  return (
    <StyledWrapper>
      <Form
        onFinish={onFinish}
        form={form}
        onFieldsChange={handleFormValuesChange}
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
        <AccommodationDesc form={form} />
        <ButtonContainer
          buttonStyle={isEditState ? 'edit' : 'navigate'}
          isValid={isValid}
        />
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: ${colors.white};

  padding: 40px;

  border-radius: 8px;
`;
