import RoomCard from '../../components/room/room-card';
import { Card, Button, Row } from 'antd';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const RoomManagement = () => {
  const navigate = useNavigate();
  const { accommodationId } = useParams();

  return (
    <StyledPageContainer bodyStyle={{ padding: 0 }}>
      <StyledFixedTitle>
        <StyledTitleButton>
          <TextBox typography="h4" color={'black900'} fontWeight={700}>
            객실 관리
          </TextBox>
          <StyledButton
            type="primary"
            onClick={() => navigate(`/${accommodationId}/room/registration`)}
          >
            + 객실추가
          </StyledButton>
        </StyledTitleButton>
      </StyledFixedTitle>
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

const StyledButton = styled(Button)`
  font-size: 18px;
  font-weight: 700;

  display: flex;
  align-items: center;
  margin-top: 2px;
`;

const StyledFixedTitle = styled.div`
  // position: fixed;
`;
