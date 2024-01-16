import { ButtonContainer } from '@components/init/ButtonContainer';
import { AccommodationInfo } from '@components/init/init-info-confirmation/AccommodationInfo';
import { RoomInfo } from '@components/init/init-info-confirmation/RoomInfo';
import styled from 'styled-components';

export const InitInfoConfirmation = () => {
  const userInputLocalStorage = localStorage.getItem('userInput');
  let accommodationData;
  let roomData;

  if (userInputLocalStorage !== null) {
    const parsedData = JSON.parse(userInputLocalStorage);
    accommodationData = parsedData.userInputValueState[0];
    roomData = parsedData.userInputValueState[0].rooms;
  }

  return (
    <StyledWrapper>
      <AccommodationInfo accommodationData={accommodationData} />
      <RoomInfo roomData={roomData} />
      <ButtonContainer buttonStyle="request" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  padding: 0 48px;
`;
