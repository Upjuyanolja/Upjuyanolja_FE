import styled from 'styled-components';
import { CommonQuantityCouponSetter } from './common-quantity-coupon-setter';
import { RoomCouponApplier } from './room-coupon-applier';
import { CouponApplierProps } from './type';
import { useEffect, useState } from 'react';
import { useCouponRegistration } from '@hooks/coupon-registration/useCouponRegistration';

export const CouponApplier = ({
  selectedCouponType,
  pendingCouponDataList,
  setPendingCouponDataList,
}: CouponApplierProps) => {
  const { couponRoomListData } = useCouponRegistration();
  const [isGroupQuantitySelected, setIsGroupQuantitySelected] = useState(false);
  const [groupQuantityValue, setGroupQuantityValue] = useState(0);

  useEffect(() => {
    console.log(couponRoomListData);
  }, [couponRoomListData]);

  return (
    <Container>
      <CommonQuantityCouponSetter
        selectedCouponType={selectedCouponType}
        groupQuantityValue={groupQuantityValue}
        setGroupQuantityValue={setGroupQuantityValue}
        isGroupQuantitySelected={isGroupQuantitySelected}
        setIsGroupQuantitySelected={setIsGroupQuantitySelected}
      />
      <StyledRoomCouponApplierWrap>
        {couponRoomListData?.rooms.map((item, index) => (
          <RoomCouponApplier
            key={index}
            roomName={item.roomName}
            index={index}
            roomId={item.roomId}
            roomPrice={item.roomPrice}
            setPendingCouponDataList={setPendingCouponDataList}
            isGroupQuantitySelected={isGroupQuantitySelected}
            groupQuantityValue={groupQuantityValue}
            selectedCouponType={selectedCouponType}
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
