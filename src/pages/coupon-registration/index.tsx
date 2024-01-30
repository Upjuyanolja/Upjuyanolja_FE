import { BuyCouponParams } from '@api/coupon/type';
import { CouponApplier } from '@components/domain/coupon-registration/coupon-applier';
import { CouponCard } from '@components/domain/coupon-registration/coupon-card';
import { CouponPreview } from '@components/domain/coupon-registration/coupon-preview';
import { DiscountType } from '@components/domain/coupon-registration/discount-type';
import { PointModal } from '@components/domain/point-charge-modal/point-modal';
import { Spacing } from '@components/atom/spacing';
import { TextBox } from '@components/atom/text-box';
import { useCouponRegistration } from '@hooks/coupon-registration/useCouponRegistration';
import {
  pendingRoomDataListState,
  totalPointsState,
} from '@stores/coupon-registration/atoms';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export const CouponRegistration = () => {
  const pendingRoomDataList = useRecoilValue(pendingRoomDataListState);
  const { accommodationId } = useParams();
  const totalPoints = useRecoilValue(totalPointsState);
  const {
    buyCoupon,
    isModalOpen,
    setIsModalOpen,
    isGetCouponRoomListRefetch,
    isGetCouponRoomListLoading,
    isGetCouponRoomListFetching,
  } = useCouponRegistration();

  useEffect(() => {
    if (!accommodationId) return;
    isGetCouponRoomListRefetch();
  }, [accommodationId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPendingRoomDataList = pendingRoomDataList.map((item) => {
      const { roomId, discountType, discount, quantity, eachPoint } = item;
      return { roomId, discountType, discount, quantity, eachPoint };
    });

    const buyCouponParams: BuyCouponParams = {
      accommodationId: Number(accommodationId),
      totalPoints: Number(totalPoints),
      rooms: formattedPendingRoomDataList,
    };

    Modal.confirm({
      content: '쿠폰을 구매하시겠습니까?',
      okText: '구매',
      cancelText: '취소',
      className: 'confirm-modal',
      onOk: () => {
        buyCoupon(buyCouponParams);
      },
    });
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLeftWrap>
          <TextBox typography="h4" fontWeight="bold">
            쿠폰 만들기
          </TextBox>
          <Spacing space="8" />
          <StyledCouponCardWrap>
            <CouponCard title="1. 쿠폰 유형 선택">
              <DiscountType />
            </CouponCard>
            <Spacing space="32" />
            <CouponCard title="2. 적용 객실 선택">
              <CouponApplier
                isGetCouponRoomListLoading={isGetCouponRoomListLoading}
                isGetCouponRoomListFetching={isGetCouponRoomListFetching}
              />
            </CouponCard>
          </StyledCouponCardWrap>
        </StyledLeftWrap>
        <div>
          <CouponPreview />
        </div>
      </StyledForm>
      {isModalOpen && (
        <PointModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  padding: 32px 48px;
`;

const StyledLeftWrap = styled.div`
  width: 580px;
`;

const StyledCouponCardWrap = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;
