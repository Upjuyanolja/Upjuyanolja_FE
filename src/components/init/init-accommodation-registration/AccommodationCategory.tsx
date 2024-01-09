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
import { useState } from 'react';
import { AccommodationCategoryProps } from './type';
import { FaCheck } from 'react-icons/fa';
import { colors } from '@/constants/colors';
import { RadioButtonCustomContainer } from './RadioButtonCustomContainer';
import { Form, Radio } from 'antd';

export const AccommodationCategory = () => {
  const [clickedCategory, setClickedCategory] =
    useState<AccommodationCategoryProps>(null);

  const handleButtonClick = (category: AccommodationCategoryProps) => {
    if (clickedCategory !== category) {
      setClickedCategory(category);
    }
  };

  const hotelCategory = ['호텔', '리조트', '관광호텔', '콘도', '레지던스'];
  const guestHouseCategory = ['게스트하우스', '한옥'];

  return (
    <StyledInputWrapper>
      <TextBox typography="h4" fontWeight={700}>
        숙소 유형을 선택해주세요.
      </TextBox>
      <Form.Item name="accommodation-category">
        <StyledRadioGroup>
          <StyledRadioButton
            value="HOTEL/RESORT"
            onClick={() => handleButtonClick('hotelResort')}
          >
            <img
              src={
                clickedCategory === 'hotelResort'
                  ? primaryHotelResortIcon
                  : grayHotelResortIcon
              }
            />
            <TextBox
              typography="h4"
              fontWeight={700}
              color={clickedCategory === 'hotelResort' ? 'primary' : 'black600'}
            >
              호텔/리조트
            </TextBox>
          </StyledRadioButton>
          <StyledRadioButton
            value="MOTEL"
            onClick={() => handleButtonClick('motel')}
          >
            <img
              src={
                clickedCategory === 'motel' ? primaryMotelIcon : grayMotelIcon
              }
            />
            <TextBox
              typography="h4"
              fontWeight={700}
              color={clickedCategory === 'motel' ? 'primary' : 'black600'}
            >
              모텔
            </TextBox>
          </StyledRadioButton>
          <StyledRadioButton
            value="PENSION/POOL"
            onClick={() => handleButtonClick('pensionPool')}
          >
            <img
              src={
                clickedCategory === 'pensionPool'
                  ? primaryPensionPoolIcon
                  : grayPensionPoolIcon
              }
            />
            <TextBox
              typography="h4"
              fontWeight={700}
              color={clickedCategory === 'pensionPool' ? 'primary' : 'black600'}
            >
              펜션/풀빌라
            </TextBox>
          </StyledRadioButton>
          <StyledRadioButton
            value="GUEST"
            onClick={() => handleButtonClick('guestHouse')}
          >
            <img
              src={
                clickedCategory === 'guestHouse'
                  ? primaryGuestHouseIcon
                  : grayGuestHouseIcon
              }
            />
            <TextBox
              typography="h4"
              fontWeight={700}
              color={clickedCategory === 'guestHouse' ? 'primary' : 'black600'}
            >
              게스트하우스
            </TextBox>
          </StyledRadioButton>
        </StyledRadioGroup>
      </Form.Item>
      {clickedCategory === 'hotelResort' && (
        <RadioButtonCustomContainer
          options={hotelCategory}
          label="상세 유형을 선택해 주세요."
          icon={<FaCheck size={15} color={colors.primary} />}
        />
      )}
      {clickedCategory === 'guestHouse' && (
        <RadioButtonCustomContainer
          options={guestHouseCategory}
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
