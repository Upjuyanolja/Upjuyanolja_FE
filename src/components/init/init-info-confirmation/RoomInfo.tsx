import { TextBox } from '@components/text-box';
import { Button, Tag } from 'antd';
import styled from 'styled-components';
import { RoomData } from './type';
import { colors } from '@/constants/colors';
import { CustomButton } from './CustomButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BsPeopleFill } from 'react-icons/bs';

export const RoomInfo = ({ roomData }: { roomData: RoomData[] }) => {
  return (
    <StyledWrapper>
      <StyledHeadContainer>
        <TextBox typography="h4" fontWeight={700}>
          객실 정보
        </TextBox>
        <StyledButton type="primary">+ 객실추가</StyledButton>
      </StyledHeadContainer>
      <StyledRoomListContainer>
        {roomData.map((room) => (
          <StyledRoomItemContainer key={room.name}>
            <div
              style={{
                width: '224px',
                height: '144px',
                backgroundColor: 'pink',
                borderRadius: '8px',
              }}
            >
              이미지
            </div>
            <StyledRoomInfoContainer>
              <StyledRoomInfoHeadContainer>
                <TextBox typography="h4" fontWeight={700}>
                  {room.name}
                </TextBox>
                <StyledButtonContainer>
                  <CustomButton text="수정" icon={<EditOutlined />} />
                  <CustomButton text="삭제" icon={<DeleteOutlined />} />
                </StyledButtonContainer>
              </StyledRoomInfoHeadContainer>
              <StyledRoomInfoMainContainer>
                <StyledRoomInfoMainLeft>
                  <StyledTagContainer>
                    <StyledTag color="default">
                      {room.options.tv && 'TV'}
                    </StyledTag>
                    <StyledTag color="default">
                      {room.options.airCondition && '에어컨'}
                    </StyledTag>
                    <StyledTag color="default">
                      {room.options.internet && '인터넷'}
                    </StyledTag>
                  </StyledTagContainer>
                  <StyledCapacityContainer>
                    <BsPeopleFill />
                    <TextBox typography="body3">
                      기준 {room.defaultCapacity}명 / 최대 {room.maxCapacity}명
                    </TextBox>
                  </StyledCapacityContainer>
                  <StyledTimeContainer>
                    <TextBox typography="body3">
                      체크인 {room.checkInTime}
                    </TextBox>
                    <TextBox typography="body3">
                      체크아웃 {room.checkOutTime}
                    </TextBox>
                  </StyledTimeContainer>
                </StyledRoomInfoMainLeft>
                <StyledRoomInfoMainRight>
                  <TextBox typography="body3">객실 수: {room.count}개</TextBox>
                  <TextBox typography="h5" fontWeight={700}>
                    {room.price}원
                  </TextBox>
                </StyledRoomInfoMainRight>
              </StyledRoomInfoMainContainer>
            </StyledRoomInfoContainer>
          </StyledRoomItemContainer>
        ))}
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

const StyledRoomItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 24px;

  height: 176px;

  padding: 16px;

  border-radius: 8px;
  border: 2px solid ${colors.primary};

  background-color: ${colors.white};
`;

const StyledRoomInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
`;

const StyledRoomInfoHeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledRoomInfoMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledRoomInfoMainLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTagContainer = styled.div`
  display: flex;
`;

const StyledTag = styled(Tag)`
  width: 56px;
`;

const StyledCapacityContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledTimeContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StyledRoomInfoMainRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;
