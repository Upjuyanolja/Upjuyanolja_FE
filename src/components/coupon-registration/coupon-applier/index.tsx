import styled from 'styled-components';
import { CommonQuantityCouponSetter } from './common-quantity-coupon-setter';
import { RoomCouponApplier } from './room-coupon-applier';

const roomMap = [
  {
    label: '스탠다드 트윈',
  },
  {
    label: '스탠다드 더블',
  },
  {
    label: '디럭스 더블',
  },
  {
    label: '스위트룸',
  },
  {
    label: '스위트룸 조식 PKG',
  },
];

export const CouponApplier = () => {
  return (
    <Container>
      <CommonQuantityCouponSetter />
      <StyledRoomCouponApplierWrap>
        {roomMap.map((item) => (
          <div key={item.label}>
            <RoomCouponApplier roomName={item.label} />
          </div>
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
