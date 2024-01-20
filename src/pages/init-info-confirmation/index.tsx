import { ROUTES } from '@/constants/routes';
import { PlusOutlined } from '@ant-design/icons';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { AccommodationInfo } from '@components/init/init-info-confirmation/AccommodationInfo';
import { RoomInfo } from '@components/init/init-info-confirmation/RoomInfo';
import { TextBox } from '@components/text-box';
import { userInputValueState } from '@stores/init/atoms';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export const InitInfoConfirmation = () => {
  const userInputValue = useRecoilValue(userInputValueState);
  const navigate = useNavigate();

  if (userInputValue[0].name === '') {
    return (
      <StyledWrapper>
        <StyledNoInputWrapper>
          <TextBox typography="h4" fontWeight={700}>
            등록 정보가 없습니다. 숙소 등록부터 진행해주세요!
          </TextBox>
          <StyledButton
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => navigate(ROUTES.INIT_ACCOMMODATION_REGISTRATION)}
          >
            숙소 등록하러 가기
          </StyledButton>
        </StyledNoInputWrapper>
      </StyledWrapper>
    );
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

  margin-top: 204px;
`;

const StyledNoInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0;
  gap: 32px;
`;

const StyledButton = styled(Button)`
  width: 300px;
  height: 50px;

  font-size: 20px;
`;
