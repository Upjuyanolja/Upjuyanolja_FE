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
import { AccommodationCategoryProps, ButtonClickedProps } from './type';
import { FaCheck } from 'react-icons/fa';
import { colors } from '@/constants/colors';
import { RadioButtonCustomContainer } from './RadioButtonCustomContainer';

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
      <StyledButtonContainer>
        <StyledButtonWrapper
          onClick={() => handleButtonClick('hotelResort')}
          $clicked={clickedCategory === 'hotelResort'}
        >
          <StyledHotelResortIcon $clicked={clickedCategory === 'hotelResort'} />
          <TextBox
            typography="h4"
            fontWeight={700}
            color="black600"
            className="accommodation-category-text"
          >
            호텔/리조트
          </TextBox>
        </StyledButtonWrapper>
        <StyledButtonWrapper
          onClick={() => handleButtonClick('motel')}
          $clicked={clickedCategory === 'motel'}
        >
          <StyledMotelIcon $clicked={clickedCategory === 'motel'} />
          <TextBox
            typography="h4"
            fontWeight={700}
            color="black600"
            className="accommodation-category-text"
          >
            모텔
          </TextBox>
        </StyledButtonWrapper>
        <StyledButtonWrapper
          onClick={() => handleButtonClick('pensionPool')}
          $clicked={clickedCategory === 'pensionPool'}
        >
          <StyledPensionPoolIcon $clicked={clickedCategory === 'pensionPool'} />
          <TextBox
            typography="h4"
            fontWeight={700}
            color="black600"
            className="accommodation-category-text"
          >
            펜션/풀빌라
          </TextBox>
        </StyledButtonWrapper>
        <StyledButtonWrapper
          onClick={() => handleButtonClick('guestHouse')}
          $clicked={clickedCategory === 'guestHouse'}
        >
          <StyledGuestHouseIcon $clicked={clickedCategory === 'guestHouse'} />
          <TextBox
            typography="h4"
            fontWeight={700}
            color="black600"
            className="accommodation-category-text"
          >
            게스트하우스
          </TextBox>
        </StyledButtonWrapper>
      </StyledButtonContainer>
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
`;

const StyledButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  padding: 33px;
`;

const StyledButtonWrapper = styled.div<ButtonClickedProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  cursor: pointer;

  .accommodation-category-text {
    color: ${({ $clicked: clicked }) => (clicked ? '#0351ff' : '#9199A4')};
  }
`;

const StyledHotelResortIcon = styled.div<ButtonClickedProps>`
  background-image: ${({ $clicked: clicked }) =>
    clicked ? `url(${primaryHotelResortIcon})` : `url(${grayHotelResortIcon})`};
  background-size: cover;

  width: 80px;
  height: 80px;
`;

const StyledMotelIcon = styled.div<ButtonClickedProps>`
  background-image: ${({ $clicked: clicked }) =>
    clicked ? `url(${primaryMotelIcon})` : `url(${grayMotelIcon})`};
  background-size: cover;

  width: 80px;
  height: 80px;
`;

const StyledPensionPoolIcon = styled.div<ButtonClickedProps>`
  background-image: ${({ $clicked: clicked }) =>
    clicked ? `url(${primaryPensionPoolIcon})` : `url(${grayPensionPoolIcon})`};
  background-size: cover;

  width: 80px;
  height: 80px;
`;

const StyledGuestHouseIcon = styled.div<ButtonClickedProps>`
  background-image: ${({ $clicked: clicked }) =>
    clicked ? `url(${primaryGuestHouseIcon})` : `url(${grayGuestHouseIcon})`};
  background-size: cover;

  width: 80px;
  height: 80px;
`;
