import styled from 'styled-components';
import { CommonQuantityCouponSetter } from './common-quantity-coupon-setter';
import { RoomCouponApplier } from './room-coupon-applier';
import { useCoupon } from '@hooks/coupon/useCoupon';
import { CouponApplierProps } from './type';
import { useEffect } from 'react';

export const CouponApplier = ({
  allQuantityValue,
  setAllQuantityValue,
  pendingCouponData,
  setPendingCouponDataList,
}: CouponApplierProps) => {
  const { couponRoomListData } = useCoupon();

  useEffect(() => {
    console.log('pendingCouponData', pendingCouponData);
  }, [pendingCouponData]);

  return (
    <Container>
      <CommonQuantityCouponSetter
        allQuantityValue={allQuantityValue}
        setAllQuantityValue={setAllQuantityValue}
      />
      <StyledRoomCouponApplierWrap>
        {couponRoomListData?.rooms.map((item, index) => (
          <RoomCouponApplier
            key={index}
            roomName={item.roomName}
            index={index}
            roomId={item.roomId}
            pendingCouponData={pendingCouponData[index]}
            setPendingCouponDataList={setPendingCouponDataList}
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
