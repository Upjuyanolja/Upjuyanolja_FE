import { ButtonContainer } from '@components/init/ButtonContainer';
import { AccommodationInfo } from '@components/init/init-info-confirmation/AccommodationInfo';
import { RoomInfo } from '@components/init/init-info-confirmation/RoomInfo';
import { useState } from 'react';
import styled from 'styled-components';

export const InitInfoConfirmation = () => {
  const userInputLocalStorage = localStorage.getItem('userInput');
  const [userInput] = useState(() => {
    return userInputLocalStorage !== null
      ? JSON.parse(userInputLocalStorage)
      : null;
  });

  return (
    <StyledWrapper>
      <AccommodationInfo
        accommodationData={userInput?.userInputValueState[0]}
      />
      <RoomInfo />
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
