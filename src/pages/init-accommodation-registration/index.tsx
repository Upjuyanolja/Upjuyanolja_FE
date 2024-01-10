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
  descErrorMessage,
  isUploadedImage,
  nameErrorMessage,
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

  const accommodationOptions = [
    '객실취사',
    '주차시설',
    '픽업 서비스',
    '바베큐장',
    '휘트니스센터',
    '노래방',
    '에어컨',
    '사우나실',
    '세미나실',
  ];

  const setUserInputValueState = useSetRecoilState(userInputValueState);

  const onFinish = (values: formValues) => {
    setUserInputValueState((prevUserInputValueState) => {
      const [userInputValue] = prevUserInputValueState;
      const updatedUserInputValue = {
        ...userInputValue,
        id: Math.floor(Math.random() * 1000000),
        type: values['accommodation-category'],
        name: values['accommodation-name'],
        address: values['accommodation-address'],
        detailAddress: values['accommodation-detailAddress'],
        description: values['accommodation-desc'],
      };
      return [updatedUserInputValue];
    });

    navigate(ROUTES.INIT_ROOM_REGISTRATION);
  };

  const accommodationNameErrorMessage = useRecoilValue(nameErrorMessage);
  const accommodationnDescErrorMessage = useRecoilValue(descErrorMessage);

  const areFormFieldsValid = () => {
    const values = form.getFieldsValue();
    return (
      values['accommodation-category'] &&
      values['accommodation-name'] &&
      values['accommodation-postCode'] &&
      values['accommodation-address'] &&
      values['accommodation-detailAddress'] &&
      values['accommodation-desc'] &&
      isUploadedImage &&
      accommodationNameErrorMessage === '' &&
      accommodationnDescErrorMessage === ''
    );
  };

  useEffect(() => {
    setIsValid(areFormFieldsValid());
  }, [form, isUploadedImage]);

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
        <AccommodationCategory />
        <NameContainer header="숙소명" />
        <AccommodationAddress form={form} />
        <ImageUploadContainer header="숙소 대표 이미지 설정" />
        <CheckBoxContainer options={accommodationOptions} header="숙소 옵션" />
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
