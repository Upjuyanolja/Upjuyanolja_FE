import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { AccommodationCategory } from '@components/init/init-accommodation-registration/AccommodationCategory';
import { AccommodationAddress } from '@components/init/init-accommodation-registration/AccommodationAddress';
import { AccommodationDesc } from '@components/init/init-accommodation-registration/AccommodationDesc';
import { Form, message } from 'antd';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { useEffect, useState } from 'react';
import {
  accommodationEditState,
  checkedAccommodationOptions,
  imageFileState,
  userInputValueState,
} from '@stores/init/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useImageFile } from '@queries/init';
import { AxiosError } from 'axios';
import { Image } from '@api/room/type';

export const InitAccommodationRegistration = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const [form] = Form.useForm();

  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);
  const accommodationData = userInputValue[0];

  const selectedOptions = useRecoilValue(checkedAccommodationOptions);

  const isEdit = useRecoilValue(accommodationEditState);

  const [imageFiles, setImageFiles] = useRecoilState(imageFileState);

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

  const { mutate: imageFile } = useImageFile({
    onSuccess(data) {
      setUserInputValue((prevUserInputValueState) => {
        const [userInputValue] = prevUserInputValueState;

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

        const updatedUserInputValue = {
          ...userInputValue,
          type,
          name: form.getFieldValue('accommodation-name'),
          address: form.getFieldValue('accommodation-address'),
          detailAddress: form.getFieldValue('accommodation-detailAddress'),
          zipCode: form.getFieldValue('accommodation-postCode'),
          description: form.getFieldValue('accommodation-desc'),
          options: selectedOptions,
          images: data.data.data.urls as unknown as Image[],
        };
        return [updatedUserInputValue];
      });

      setImageFiles([]);
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

  const onFinish = () => {
    const formData = new FormData();

    imageFiles.forEach((image) => {
      formData.append('image1', image);
    });

    imageFile(formData);

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
      imageFiles.length !== 0;

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
  }, [imageFiles]);

  const handleFormValuesChange = () => {
    setIsValid(areFormFieldsValid());
  };

  /** isEdit일 때 input에 value set해주기 */
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
