import { TextBox } from '@components/text-box';
import { Input } from 'antd';
import styled from 'styled-components';

export const RoomContainer = ({
  room,
}: {
  room: { name: string; price: string };
}) => {
  return (
    <StyledRoomContainer>
      <TextBox fontWeight={700} typography="body2">
        {room.name}
      </TextBox>
      <TextBox fontWeight={400} typography="body4">
        {room.price}
      </TextBox>
    </StyledRoomContainer>
  );
};
const StyledRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CouponNameContainer = ({ text }: { text: string }) => {
  return (
    <StyledCouponNameContainer>
      <TextBox fontWeight={700} typography="body2">
        {text}
      </TextBox>
      <TextBox color="black600" typography="body4" fontWeight={400}>
        (적용가 99,000원)
      </TextBox>
    </StyledCouponNameContainer>
  );
};
const StyledCouponNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DayLimitInput = ({ text }: { text: string }) => {
  return (
    <>
      <StyledInput defaultValue={text} />
      <TextBox typography="body2" fontWeight={400}>
        장
      </TextBox>
    </>
  );
};
const StyledInput = styled(Input)`
  width: 56px;
`;
