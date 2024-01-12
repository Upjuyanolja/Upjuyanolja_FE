import styled from 'styled-components';
import { CommonQuantityCouponSetter } from './common-quantity-coupon-setter';
import { RoomCouponApplier } from './room-coupon-applier';
import { useCoupon } from '@hooks/coupon/useCoupon';

export const CouponApplier = () => {
  const { couponRoomListData } = useCoupon();

  return (
    <Container>
      <CommonQuantityCouponSetter />
      <StyledRoomCouponApplierWrap>
        {couponRoomListData?.rooms.map((item, index) => (
          <RoomCouponApplier
            key={index}
            roomId={item.roomId}
            roomName={item.roomName}
            index={index}
          />
        ))}
      </StyledRoomCouponApplierWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 30px;
`;

const StyledRoomCouponApplierWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
`;
