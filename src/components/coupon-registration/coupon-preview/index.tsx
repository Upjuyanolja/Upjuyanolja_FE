import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { CouponPreviewItem } from './coupon-preview-item';
import { Spacing } from '@components/spacing';
import { Button, Checkbox } from 'antd';
import { PendingCouponDataList } from '../type';
import { numberFormat } from '@/utils/Format/numberFormat';
import { useRecoilValue } from 'recoil';
import {
  determinedPriceState,
  pendingRoomDataListState,
  selectedDiscountTypeState,
} from '@stores/coupon-registration/atoms';
import { FLAT_DISCOUNT_TYPE } from '@/constants/coupon-registration';

export const CouponPreview = () => {
  const selectedDiscountType = useRecoilValue(selectedDiscountTypeState);
  const determinedPrice = useRecoilValue(determinedPriceState);
  const pendingRoomData = useRecoilValue(pendingRoomDataListState);

  const calculateTotalPrice = (
    pendingCouponDataList: PendingCouponDataList,
  ) => {
    return pendingCouponDataList.reduce((total, room) => {
      return (
        total + parseInt(room.quantity) * (parseInt(determinedPrice) * 100)
      );
    }, 0);
  };

  return (
    <Container>
      <TextBox typography="h4" fontWeight="bold" color="black900">
        쿠폰 미리보기
      </TextBox>
      <StyledCouponWrap>
        <StyledTitleWrap>
          {!determinedPrice ? (
            <TextBox typography="body2" fontWeight="bold" color="primary">
              쿠폰 유형을 선택해 주세요.
            </TextBox>
          ) : selectedDiscountType === FLAT_DISCOUNT_TYPE ? (
            <TextBox typography="h4" fontWeight="bold" color="primary">
              {determinedPrice}원 할인 쿠폰
            </TextBox>
          ) : (
            <TextBox typography="h4" fontWeight="bold" color="primary">
              {determinedPrice}% 할인 쿠폰
            </TextBox>
          )}
        </StyledTitleWrap>
        <StyledPreviewItemWrap>
          {pendingRoomData.length === 0 && <p>하이하이</p>}
          {pendingRoomData.map((item, index) => (
            <CouponPreviewItem
              roomName={item.roomName}
              eachPrice={item.eachPrice}
              quantity={item.quantity}
              key={index}
            />
          ))}
        </StyledPreviewItemWrap>
        <Spacing space="16" />
        <StyledCouponTotalPrice>
          <TextBox typography="h5" fontWeight="bold" color="primary">
            합계 : 1 P
          </TextBox>
        </StyledCouponTotalPrice>
        <Spacing space="16" />
        <StyledTermsAgreement>
          <Checkbox />
          <TextBox typography="body4" color="black900">
            주문 내용을 확인하였으며,{' '}
            <TextBox typography="body4" color="primaryHover">
              구매 약관
            </TextBox>{' '}
            등에 동의합니다.
          </TextBox>
        </StyledTermsAgreement>
        <Spacing space="16" />
        <StyledButton>
          <TextBox typography="h5" fontWeight="bold" color="white">
            구매하기
          </TextBox>
        </StyledButton>
        <Spacing space="16" />
      </StyledCouponWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledCouponWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 324px;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  overflow: hidden;
`;

const StyledTitleWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
  width: 100%;
  background-color: ${colors.light};
`;

const StyledCouponTotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px 16px 4px 0;
  margin: 0 12px;
  border: 2px solid ${colors.primary};
  border-radius: 2px;
  background: linear-gradient(268.34deg, #e0edff 1.74%, #ffffff 120.49%);
`;

const StyledTermsAgreement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 12px;
  background-color: ${colors.primary};
  height: 54px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
  &:active {
    background-color: ${colors.primaryActive};
  }
`;

const StyledPreviewItemWrap = styled.div`
  overflow-y: auto;
`;
