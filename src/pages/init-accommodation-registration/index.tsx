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
  checkedAccommodationOptions,
  imageFileState,
  isUpdatedAccommodationState,
  roomPrevButtonState,
  userInputValueState,
} from '@stores/init/atoms';
import { useRecoilState } from 'recoil';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useImageFile } from '@queries/init';
import { AxiosError } from 'axios';
import { Image } from '@api/room/type';
import {
  UserInputValue,
  defaultAccommodation,
} from '@components/init/init-accommodation-registration/type';
import { AccommodationCategoryProps } from '@components/init/type';
import { RESPONSE_CODE } from '@/constants/api';

export const InitAccommodationRegistration = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const [form] = Form.useForm();

  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);
  const accommodationData = userInputValue[0];

  const [selectedOptions, setSelectedOptions] = useRecoilState(
    checkedAccommodationOptions,
  );

  const [imageFiles, setImageFiles] = useRecoilState(imageFileState);
  const [updatedAccommodationInfo, setUpdatedAccommodationInfo] =
    useRecoilState(isUpdatedAccommodationState);

  const [defaultValue, setDefaultValue] = useState<defaultAccommodation>({
    images: undefined,
    options: undefined,
    type: undefined,
  });

  const [isClickedPrevButton, setClickedPrevButton] =
    useRecoilState(roomPrevButtonState);

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
          thumbnail: data.data.data.urls[0].url,
        };
        return [updatedUserInputValue];
      });

      setUpdatedAccommodationInfo(true);
      setSelectedOptions({
        cooking: false,
        parking: false,
        pickup: false,
        barbecue: false,
        fitness: false,
        karaoke: false,
        sauna: false,
        sports: false,
        seminar: false,
      });
      setImageFiles([]);
      setClickedPrevButton(false);

      if (userInputValue[0].isAccommodationEdit) {
        navigate(ROUTES.INIT_INFO_CONFIRMATION);
      } else {
        navigate(ROUTES.INIT_ROOM_REGISTRATION);
      }
    },
    onError(error) {
      if (error instanceof AxiosError) {
        message.error({
          content: '요청에 실패했습니다. 잠시 후 다시 시도해주세요',
          style: { marginTop: '210px' },
        });
      }
      if (error.response?.data.code === RESPONSE_CODE.IMAGE_SAVE_FAIL) {
        message.error({
          content: '요청을 실패했습니다. 관리자에게 문의해주세요',
          style: { marginTop: '210px' },
        });
      }
    },
  });

  const onFinish = () => {
    const formData = new FormData();

    let shouldExecuteImageFile = false;

    for (let index = 0; index < imageFiles.length; index++) {
      const image = imageFiles[index];
      if (image.file !== null) {
        formData.append('image1', image.file);
        shouldExecuteImageFile = true;
      }
    }

    if (shouldExecuteImageFile) {
      imageFile(formData);
    } else {
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
          images: userInputValue[0].images,
          thumbnail: userInputValue[0].images[0].url,
          rooms: userInputValue[0].rooms,
        };
        return [updatedUserInputValue];
      });

      setUpdatedAccommodationInfo(true);
      setSelectedOptions({
        cooking: false,
        parking: false,
        pickup: false,
        barbecue: false,
        fitness: false,
        karaoke: false,
        sauna: false,
        sports: false,
        seminar: false,
      });
      setImageFiles([]);
      setClickedPrevButton(false);

      if (userInputValue[0].isAccommodationEdit) {
        navigate(ROUTES.INIT_INFO_CONFIRMATION);
      } else {
        navigate(ROUTES.INIT_ROOM_REGISTRATION);
      }
    }
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

  useEffect(() => {
    if (
      accommodationData.isAccommodationEdit ||
      isClickedPrevButton ||
      updatedAccommodationInfo
    ) {
      form.setFieldValue('accommodation-name', accommodationData.name);
      form.setFieldValue('accommodation-postCode', accommodationData.zipCode);
      form.setFieldValue('accommodation-address', accommodationData.address);
      form.setFieldValue(
        'accommodation-detailAddress',
        accommodationData.detailAddress,
      );
      form.setFieldValue('accommodation-desc', accommodationData.description);
      setDefaultValue({
        images: userInputValue[0].images,
        options: userInputValue[0].options,
        type: userInputValue[0].type as defaultAccommodation['type'],
      });
    }
  }, []);

  return (
    <StyledWrapper>
      <Form
        onFinish={onFinish}
        form={form}
        onFieldsChange={handleFormValuesChange}
      >
        <AccommodationCategory
          form={form}
          defaultValue={
            defaultValue.type as AccommodationCategoryProps['defaultValue']
          }
          isClickedPrevButton={isClickedPrevButton}
          updatedAccommodationInfo={updatedAccommodationInfo}
        />
        <NameContainer
          header="숙소명"
          placeholder="숙소명을 입력해 주세요."
          form={form}
        />
        <AccommodationAddress form={form} />
        <ImageUploadContainer
          header="숙소 대표 이미지 설정"
          images={defaultValue.images}
        />
        <CheckBoxContainer
          options={accommodationOptions}
          header="숙소"
          defaultValue={defaultValue.options}
        />
        <AccommodationDesc form={form} />
        <ButtonContainer
          buttonStyle={
            accommodationData.isAccommodationEdit ? 'edit' : 'navigate'
          }
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

  margin-top: 204px;
`;
