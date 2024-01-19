import styled from 'styled-components';
import { CommonQuantityCouponSetter } from './common-quantity-coupon-setter';
import { RoomCouponApplier } from './room-coupon-applier';
import { useRecoilValue } from 'recoil';
import { getCouponRoomDataListState } from '@stores/coupon-registration/atoms';

export const CouponApplier = () => {
  const getCouponRoomDataList = useRecoilValue(getCouponRoomDataListState);

  return (
    <Container>
      <CommonQuantityCouponSetter />
      <StyledRoomCouponApplierWrap>
        {getCouponRoomDataList?.rooms.map((item, index) => (
          <RoomCouponApplier
            key={item.roomId}
            roomName={item.roomName}
            index={index}
            roomId={item.roomId}
            roomPrice={item.roomPrice}
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
