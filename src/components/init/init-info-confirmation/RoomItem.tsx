import { TextBox } from '@components/text-box';
import { Modal, Tag, message } from 'antd';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { CustomButton } from './CustomButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BsPeopleFill } from 'react-icons/bs';
import { ImageCarousel } from './ImageCarousel';
import { Room } from '../init-accommodation-registration/type';
import { useRecoilState } from 'recoil';
import { userInputValueState } from '@stores/init/atoms';

export const RoomItem = () => {
  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);

  const removeRoom = (room: Room) => {
    if (userInputValue[0].rooms.length === 1) {
      message.error('최소 1개의 객실이 등록되어야 합니다.');
      return;
    }

    const newRooms = userInputValue[0].rooms.filter(
      (item) => item.name !== room.name,
    );

    setUserInputValue((prevUserInputValue) => {
      const [userInputValueState] = prevUserInputValue;

      const updatedUserInputValue = {
        ...userInputValueState,
        rooms: newRooms,
      };

      return [updatedUserInputValue];
    });

    message.success('삭제되었습니다.');
  };

  const confirm = (room: Room) => {
    Modal.confirm({
      title: '해당 객실을 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      icon: '',
      width: '494px',
      bodyStyle: { height: '216px' },
      centered: true,
      onOk: () => removeRoom(room),
    });
  };

  return (
    <>
      {userInputValue[0].rooms.map((room: Room) => (
        <StyledRoomItemContainer key={room.name}>
          <ImageCarousel images={room.images} />
          <StyledRoomInfoContainer>
            <StyledRoomInfoHeadContainer>
              <TextBox typography="h4" fontWeight={700}>
                {room.name}
              </TextBox>
              <StyledButtonContainer>
                <CustomButton text="수정" icon={<EditOutlined />} />
                <CustomButton
                  text="삭제"
                  icon={<DeleteOutlined />}
                  onClick={() => confirm(room)}
                />
              </StyledButtonContainer>
            </StyledRoomInfoHeadContainer>
            <StyledRoomInfoMainContainer>
              <StyledRoomInfoMainLeft>
                <StyledTagContainer>
                  {room.options.tv && <StyledTag color="default">TV</StyledTag>}
                  {room.options.airCondition && (
                    <StyledTag color="default">에어컨</StyledTag>
                  )}
                  {room.options.internet && (
                    <StyledTag color="default">인터넷</StyledTag>
                  )}
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
                  {room.price?.toLocaleString()}원
                </TextBox>
              </StyledRoomInfoMainRight>
            </StyledRoomInfoMainContainer>
          </StyledRoomInfoContainer>
        </StyledRoomItemContainer>
      ))}
    </>
  );
};

const StyledRoomItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 24px;

  height: 176px;

  padding: 16px;

  border-radius: 8px;
  border: 2px solid ${colors.primary};

  background-color: ${colors.white};

  .ant-tag {
    margin-right: 0;
  }
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
  gap: 4px;
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
