import { styled } from 'styled-components';
import primaryHotelResortIcon from '@assets/image/primaryHotel_resort.png';
import primaryMotelIcon from '@assets/image/primaryMotel.png';
import primaryPensionPoolIcon from '@assets/image/primaryPension_pool.png';
import primaryGuestHouseIcon from '@assets/image/primaryGuestHouse.png';
import grayHotelResortIcon from '@assets/image/grayHotel_resort.png';
import grayMotelIcon from '@assets/image/grayMotel.png';
import grayPensionPoolIcon from '@assets/image/grayPension_pool.png';
import grayGuestHouseIcon from '@assets/image/grayGuestHouse.png';
import { TextBox } from '@components/text-box';
import { useEffect, useState } from 'react';
import { AccommodationCategoryType, formType } from './type';
import { FaCheck } from 'react-icons/fa';
import { colors } from '@/constants/colors';
import { RadioButtonCustomContainer } from './RadioButtonCustomContainer';
import { Form, Radio } from 'antd';

export const AccommodationCategory = ({ form }: formType) => {
  const [clickedCategory, setClickedCategory] =
    useState<AccommodationCategoryType>(null);

  const handleButtonClick = (category: AccommodationCategoryType) => {
    if (clickedCategory !== category) {
      setClickedCategory(category);
    }
  };

  const hotelResortDetailCategoryMapping = {
    호텔: 'HOTEL',
    리조트: 'RESORT',
    관광호텔: 'TOURIST_HOTEL',
    콘도: 'CONDO',
    레지던스: 'RESIDENCE',
  };

  const guestHouseDetailCategoryMapping = {
    게스트하우스: 'GUEST_HOUSE',
    한옥: 'HANOK',
  };

  useEffect(() => {
    form.setFieldValue('accommodation-category', clickedCategory);
  }, [clickedCategory, form]);

  return (
    <StyledInputWrapper>
      <TextBox typography="h4" fontWeight={700}>
        숙소 유형을 선택해주세요.
      </TextBox>
      <Form.Item name="accommodation-category">
        <StyledRadioGroup>
          <StyledRadioButton
            value="HOTEL/RESORT"
            onClick={() => handleButtonClick('HOTEL/RESORT')}
          >
            <img
              src={
                clickedCategory === 'HOTEL/RESORT'
                  ? primaryHotelResortIcon
                  : grayHotelResortIcon
              }
            />
            <TextBox
              typography="h4"
              fontWeight={700}
              color={
                clickedCategory === 'HOTEL/RESORT' ? 'primary' : 'black600'
              }
            >
              호텔/리조트
            </TextBox>
          </StyledRadioButton>
          <StyledRadioButton
            value="MOTEL"
            onClick={() => handleButtonClick('MOTEL')}
          >
            <img
              src={
                clickedCategory === 'MOTEL' ? primaryMotelIcon : grayMotelIcon
              }
            />
            <TextBox
              typography="h4"
              fontWeight={700}
              color={clickedCategory === 'MOTEL' ? 'primary' : 'black600'}
            >
              모텔
            </TextBox>
          </StyledRadioButton>
          <StyledRadioButton
            value="PENSION/POOL"
            onClick={() => handleButtonClick('PENSION/POOL')}
          >
            <img
              src={
                clickedCategory === 'PENSION/POOL'
                  ? primaryPensionPoolIcon
                  : grayPensionPoolIcon
              }
            />
            <TextBox
              typography="h4"
              fontWeight={700}
              color={
                clickedCategory === 'PENSION/POOL' ? 'primary' : 'black600'
              }
            >
              펜션/풀빌라
            </TextBox>
          </StyledRadioButton>
          <StyledRadioButton
            value="GUEST"
            onClick={() => handleButtonClick('GUEST')}
          >
            <img
              src={
                clickedCategory === 'GUEST'
                  ? primaryGuestHouseIcon
                  : grayGuestHouseIcon
              }
            />
            <TextBox
              typography="h4"
              fontWeight={700}
              color={clickedCategory === 'GUEST' ? 'primary' : 'black600'}
            >
              게스트하우스
            </TextBox>
          </StyledRadioButton>
        </StyledRadioGroup>
      </Form.Item>
      {clickedCategory === 'HOTEL/RESORT' && (
        <RadioButtonCustomContainer
          form={form}
          options={hotelResortDetailCategoryMapping}
          label="상세 유형을 선택해 주세요."
          icon={<FaCheck size={15} color={colors.primary} />}
        />
      )}
      {clickedCategory === 'GUEST' && (
        <RadioButtonCustomContainer
          form={form}
          options={guestHouseDetailCategoryMapping}
          label="상세 유형을 선택해 주세요."
          icon={<FaCheck size={15} color={colors.primary} />}
        />
      )}
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  .ant-radio-button-wrapper {
    border: 0;

    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;

      border: 0;
    }

    padding: 33px 44px;

    height: 200px;
  }

  .ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    ):focus-within {
    box-shadow: none;
  }

  .ant-radio-button-wrapper:not(:first-child)::before {
    display: none;
  }

  .ant-radio-button-checked {
    &:hover {
      color: ${colors.primary};
    }
  }
`;

const StyledRadioGroup = styled(Radio.Group)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 16px;
`;

const StyledRadioButton = styled(Radio.Button)`
  border: 0;
  color: ${colors.black600};

  &:hover {
    color: ${colors.black600};
  }
`;
