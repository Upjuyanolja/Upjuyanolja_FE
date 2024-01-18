import { ButtonContainer } from '@components/init/ButtonContainer';
import { AccommodationInfo } from '@components/init/init-info-confirmation/AccommodationInfo';
import { RoomInfo } from '@components/init/init-info-confirmation/RoomInfo';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const InitInfoConfirmation = () => {
  const [userInput, setUserInput] = useState(() => {
    const userInputLocalStorage = localStorage.getItem('userInput');
    return userInputLocalStorage !== null
      ? JSON.parse(userInputLocalStorage)
      : null;
  });

  useEffect(() => {
    const userInputLocalStorage = localStorage.getItem('userInput');
    if (userInputLocalStorage !== null) {
      setUserInput(JSON.parse(userInputLocalStorage));
    }
  }, [userInput]);

  return (
    <StyledWrapper>
      <AccommodationInfo
        accommodationData={userInput?.userInputValueState[0]}
      />
      <RoomInfo roomData={userInput?.userInputValueState[0]?.rooms} />
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
