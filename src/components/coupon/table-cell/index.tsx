import { TextBox } from '@components/text-box';
import { Input } from 'antd';
import styled from 'styled-components';
import {
  couponNameContainerProps,
  dayLimitInputProps,
  roomContainerProps,
} from './type';

export const RoomContainer = ({ room }: roomContainerProps) => {
  return (
    <StyledRoomContainer>
      <TextBox fontWeight={700} typography="body2">
        {room.name}
      </TextBox>
      <TextBox fontWeight={400} typography="body4">
        {room.price.toLocaleString()}원
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

export const CouponNameContainer = ({
  info,
  isSoldOut,
}: couponNameContainerProps) => {
  return (
    <StyledCouponNameContainer>
      <TextBox
        fontWeight={700}
        typography="body2"
        color={isSoldOut ? 'black600' : 'black900'}
      >
        {info.name}
      </TextBox>
      <TextBox color="black600" typography="body4" fontWeight={400}>
        (적용가 {info.appliedPrice.toLocaleString()}원)
      </TextBox>
    </StyledCouponNameContainer>
  );
};
const StyledCouponNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DayLimitInput = ({ dayLimit, isSoldOut }: dayLimitInputProps) => {
  return (
    <>
      <StyledInput
        defaultValue={dayLimit === -1 ? '-' : dayLimit}
        disabled={isSoldOut}
      />
      <TextBox
        typography="body2"
        fontWeight={400}
        color={isSoldOut ? 'black600' : 'black900'}
      >
        장
      </TextBox>
    </>
  );
};
const StyledInput = styled(Input)`
  width: 56px;
  margin-right: 4px;
`;
