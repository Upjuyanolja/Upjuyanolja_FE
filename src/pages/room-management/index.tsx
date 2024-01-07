import { RoomCard } from '../../components/room/room-card';
import { Card, Button, Row } from 'antd';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';

const RoomManagement = () => {
  return (
    <PageContainer bodyStyle={{ padding: 0 }}>
      <TitleButton>
        <TextBox typography="h4" color={'black900'} fontWeight={700}>
          객실 관리
        </TextBox>
        <AddRoomButton type="primary">
          <TextBox typography="body1" color={'white'} fontWeight={700}>
            + 객실추가
          </TextBox>
        </AddRoomButton>
      </TitleButton>
      <RoomCard />
    </PageContainer>
  );
};

export default RoomManagement;

const PageContainer = styled(Card)`
  padding: 16px 48px;
  border: none;
  margin: 0;
`;

const TitleButton = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const AddRoomButton = styled(Button)`
  border-radius: 2px;
  background: var(--Foundation-Blue-Normal, #0351ff);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
