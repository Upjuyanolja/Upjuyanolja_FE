import { ButtonContainer } from '@components/init/ButtonContainer';
import { AccommodationInfo } from '@components/init/init-info-confirmation/AccommodationInfo';
import { RoomInfo } from '@components/init/init-info-confirmation/RoomInfo';
import styled from 'styled-components';

export const InitInfoConfirmation = () => {
  const isValid = true;

  const hardRoomData = [
    {
      name: '봄',
      price: 100000,
      defaultCapacity: 2,
      maxCapacity: 6,
      checkInTime: '15:00',
      checkOutTime: '12:00',
      count: 5,
      images: [
        {
          url: 'https://images/pension_room2_2.webp',
        },
        {
          url: 'https://images/pension_room2_1.webp',
        },
      ],
      options: {
        airCondition: true,
        tv: true,
        internet: true,
      },
    },
    {
      name: '여름',
      price: 150000,
      defaultCapacity: 2,
      maxCapacity: 6,
      checkInTime: '15:00',
      checkOutTime: '12:00',
      count: 5,
      images: [
        {
          url: 'https://images/pension_room3_2.webp',
        },
        {
          url: 'https://images/pension_room3_1.webp',
        },
      ],
      options: {
        airCondition: true,
        tv: true,
        internet: true,
      },
    },
  ];
  return (
    <StyledWrapper>
      <AccommodationInfo />
      <RoomInfo roomData={hardRoomData} />
      <ButtonContainer buttonStyle="request" isValid={isValid} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  padding: 0 48px;
`;
