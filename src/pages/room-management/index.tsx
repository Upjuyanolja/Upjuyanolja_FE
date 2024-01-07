import RoomCard from '../../components/room/room-card';
import { Card, Button, Row } from 'antd';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { colors } from '@/constants/colors';

const RoomManagement = () => {
  return (
    <StyledPageContainer bodyStyle={{ padding: 0 }}>
      <StyledTitleButton>
        <TextBox typography="h4" color={'black900'} fontWeight={700}>
          객실 관리
        </TextBox>
        <StyledAddRoomButton type="primary">
          <TextBox typography="body1" color={'white'} fontWeight={700}>
            + 객실추가
          </TextBox>
        </StyledAddRoomButton>
      </StyledTitleButton>
      <RoomCard />
    </StyledPageContainer>
  );
};

export default RoomManagement;

const StyledPageContainer = styled(Card)`
  padding: 16px 48px;
  border: none;
  margin: 0;
`;

const StyledTitleButton = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledAddRoomButton = styled(Button)`
  border-radius: 2px;
  background: ${colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
