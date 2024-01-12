import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { RoomCouponApplierProps } from './type';
import { InputChangeEvent } from '@/types/event';

export const RoomCouponApplier = ({
  roomName,
  index,
  roomId,
  pendingCouponData,
  setPendingCouponDataList,
}: RoomCouponApplierProps) => {
  const handleQuantityChange = (e: InputChangeEvent) => {
    const newValue = e.target.value;
    setPendingCouponDataList((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = { roomId, roomName, quantity: newValue };
      return newValues;
    });
  };
  return (
    <Container>
      <StyledLeftWrap>
        <Checkbox id={`checkbox${index}`} />
        <label htmlFor={`checkbox${index}`}>
          <TextBox typography="h5" fontWeight="bold" color="black900">
            {roomName}
          </TextBox>
        </label>
      </StyledLeftWrap>
      <StyledRightWrap>
        <StyledInput
          size="small"
          maxLength={4}
          value={pendingCouponData?.quantity || '0'}
          onChange={handleQuantityChange}
        />
        <TextBox typography="body1" color="black900">
          장
        </TextBox>
      </StyledRightWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const StyledRightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledInput = styled(Input)`
  width: 114px;
  height: 40px;
`;
