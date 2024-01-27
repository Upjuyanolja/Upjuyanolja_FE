import { ROUTES } from '@/constants/routes';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { AccommodationInfo } from '@components/init/init-info-confirmation/AccommodationInfo';
import { RoomInfo } from '@components/init/init-info-confirmation/RoomInfo';
import { getCookie } from '@hooks/sign-in/useSignIn';
import {
  addRoomState,
  isUpdatedAccommodationState,
  isUpdatedRoomState,
  userInputValueState,
} from '@stores/init/atoms';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

export const InitInfoConfirmation = () => {
  const userInputValue = useRecoilValue(userInputValueState);
  const navigate = useNavigate();
  const setUpdatedAccommodationInfo = useSetRecoilState(
    isUpdatedAccommodationState,
  );
  const setUpdatedRoomInfo = useSetRecoilState(isUpdatedRoomState);
  const setIsAddRoomState = useSetRecoilState(addRoomState);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsAddRoomState(false);
    if (userInputValue[0].name !== '') setUpdatedAccommodationInfo(true);
    if (userInputValue[0].rooms.length !== 0) setUpdatedRoomInfo(true);
  }, []);

  if (userInputValue[0].name === '') {
    const accommodationId = getCookie('accommodationId');
    if (accommodationId) navigate(`/${accommodationId}${ROUTES.MAIN}`);
    else navigate(ROUTES.INIT);
  }

  return (
    <StyledWrapper>
      <AccommodationInfo />
      <RoomInfo />
      <ButtonContainer
        buttonStyle="request"
        isValid={userInputValue[0].rooms.length !== 0}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  padding: 0 48px;
`;
