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

export const InitAccommodationRegistration = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const [form] = Form.useForm();

  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);
  const accommodationData = userInputValue[0];

  const selectedOptions = useRecoilValue(checkedAccommodationOptions);
  const selectedImages = useRecoilValue(selectedAccommodationFilesState);

  const isEdit = useRecoilValue(accommodationEditState);

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

  const onFinish = (values: { [key: string]: string }) => {
    setUserInputValue((prevUserInputValueState) => {
      const [userInputValue] = prevUserInputValueState;

      let type;
      switch (values['accommodation-category']) {
        case 'HOTEL/RESORT':
          type = values['accommodation-hotel-category'];
          break;
        case 'GUEST_HOUSE':
          type = values['accommodation-guest-category'];
          break;
        default:
          type = values['accommodation-category'];
      }

      const updatedUserInputValue = {
        ...userInputValue,
        type,
        name: values['accommodation-name'],
        address: values['accommodation-address'],
        detailAddress: values['accommodation-detailAddress'],
        zipCode: values['accommodation-postCode'],
        description: values['accommodation-desc'],
        options: selectedOptions,
        images: selectedImages,
      };
      return [updatedUserInputValue];
    });

    navigate(ROUTES.INIT_ROOM_REGISTRATION);
  };

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();

    const commonConditions =
      values['accommodation-postCode'] &&
      values['accommodation-address'] &&
      values['accommodation-detailAddress'] &&
      values['accommodation-name'] &&
      values['accommodation-category'] &&
      values['accommodation-desc'] &&
      selectedImages.length !== 0;

    const hotelResortConditions =
      values['accommodation-category'] !== 'HOTEL/RESORT' ||
      values['accommodation-hotel-category'];

    const guestConditions =
      values['accommodation-category'] !== 'GUEST_HOUSE' ||
      values['accommodation-guest-category'];

    return (
      !form.getFieldsError().some(({ errors }) => errors.length) &&
      commonConditions &&
      hotelResortConditions &&
      guestConditions
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [selectedImages]);

  const handleFormValuesChange = () => {
    setIsValid(areFormFieldsValid());
  };

  useEffect(() => {
    if (isEdit) {
      form.setFieldValue('accommodation-name', accommodationData.name);
      form.setFieldValue('accommodation-postCode', accommodationData.zipCode);
      form.setFieldValue('accommodation-address', accommodationData.address);
      form.setFieldValue(
        'accommodation-detailAddress',
        accommodationData.detailAddress,
      );
      form.setFieldValue('accommodation-desc', accommodationData.description);
    }
  }, []);

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
          buttonStyle={isEdit ? 'edit' : 'navigate'}
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
