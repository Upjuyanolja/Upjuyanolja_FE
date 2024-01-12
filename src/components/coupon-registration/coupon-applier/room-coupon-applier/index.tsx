import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { RoomCouponApplierProps } from './type';
import { useCouponRoomProvider } from '@hooks/coupon-registration/useCouponRoomProvider';

export const RoomCouponApplier = ({
  roomName,
  index,
  roomId,
}: RoomCouponApplierProps) => {
  const {
    itemQuantityValue,
    updateCouponQuantity,
    setItemQuantityValue,
    couponQuantitiesByRoom,
  } = useCouponRoomProvider();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantityValue = parseInt(e.target.value);

    updateCouponQuantity(roomName, roomId, quantityValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemQuantityValue(e.target.value);
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
          value={itemQuantityValue}
          onChange={handleChange}
          onBlur={handleInputChange}
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
