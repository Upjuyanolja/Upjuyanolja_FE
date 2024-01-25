import { TextBox } from '@components/text-box';
import { Button } from 'antd';
import styled from 'styled-components';
import { RoomItem } from './RoomItem';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addRoomState, userInputValueState } from '@stores/init/atoms';

export const RoomInfo = () => {
  const navigate = useNavigate();
  const setIsAddRoom = useSetRecoilState(addRoomState);

  const handleAddButton = () => {
    setIsAddRoom(true);
    navigate(ROUTES.INIT_ROOM_REGISTRATION);
  };

  const userInputValue = useRecoilValue(userInputValueState);

  return (
    <StyledWrapper>
      <StyledHeadContainer>
        <StyledHeadTextContainer>
          <TextBox typography="h4" fontWeight={700}>
            객실 정보
          </TextBox>
          <TextBox color="black600" typography="body3">
            최대 15개 까지 등록 가능합니다.
          </TextBox>
        </StyledHeadTextContainer>
        {userInputValue[0].rooms.length < 15 && (
          <StyledButton
            type="primary"
            onClick={handleAddButton}
            data-testid="add-room-button"
          >
            + 객실추가
          </StyledButton>
        )}
      </StyledHeadContainer>
      <StyledRoomListContainer>
        <RoomItem />
      </StyledRoomListContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ant-btn {
    .anticon + span {
      margin-left: 0;
    }
    .span {
      display: block;
    }
  }

  .ant-tag {
    display: flex;
    justify-content: center;
  }
`;

const StyledHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledHeadTextContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  font-size: 18px;
  font-weight: 700;

  display: flex;
  align-items: center;
`;

const StyledRoomListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
