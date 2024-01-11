import { ButtonContainer } from '@components/init/ButtonContainer';
import { AccommodationInfo } from '@components/init/init-info-confirmation/AccommodationInfo';
import { RoomInfo } from '@components/init/init-info-confirmation/RoomInfo';
import styled from 'styled-components';

export const InitInfoConfirmation = () => {
  const isValid = true;
  return (
    <StyledWrapper>
      <AccommodationInfo />
      <RoomInfo />
      <ButtonContainer buttonStyle="request" isValid={isValid} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
