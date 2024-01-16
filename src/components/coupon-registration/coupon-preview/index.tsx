import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { CouponPreviewItem } from './coupon-preview-item';
import { Spacing } from '@components/spacing';
import { Button, Checkbox } from 'antd';
import { PendingRoomDataList } from '../type';
import { numberFormat } from '@/utils/Format/numberFormat';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  determinedPriceState,
  isValidCouponRegistrationState,
  pendingRoomDataListState,
  selectedDiscountTypeState,
} from '@stores/coupon-registration/atoms';
import { FLAT_DISCOUNT_TYPE } from '@/constants/coupon-registration';
import { useEffect, useState } from 'react';
import { AgreementModal } from '@components/point-charge-modal/agreement-modal';
import { MouseEvent } from '@/types/event';

export const CouponPreview = () => {
  const selectedDiscountType = useRecoilValue(selectedDiscountTypeState);
  const determinedPrice = useRecoilValue(determinedPriceState);
  const pendingRoomDataList = useRecoilValue(pendingRoomDataListState);
  const [isValidCouponRegistration, setIsValidCouponRegistration] =
    useRecoilState(isValidCouponRegistrationState);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const calculateTotalPrice = (pendingRoomDataList: PendingRoomDataList) => {
    return pendingRoomDataList.reduce((total, room) => {
      return (
        total +
        parseInt(numberFormat(room.quantity)) *
          (parseInt(numberFormat(determinedPrice)) * 100)
      );
    }, 0);
  };

  const totalPrice = calculateTotalPrice(pendingRoomDataList);

  useEffect(() => {
    if (isChecked && totalPrice) {
      setIsValidCouponRegistration(true);
    }
    if (!isChecked || !totalPrice) {
      return setIsValidCouponRegistration(false);
    }
  }, [isChecked, totalPrice]);

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
          {pendingRoomDataList.length === 0 && (
            <StyledNotice>
              <TextBox typography="body2" color="black600">
                전용 객실을 선택해주세요.
              </TextBox>
            </StyledNotice>
          )}
          {pendingRoomDataList.map((item, index) => (
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
            합계: {determinedPrice ? numberFormat(totalPrice) : '0'}P
          </TextBox>
        </StyledCouponTotalPrice>
        <Spacing space="16" />
        <StyledTermsAgreement>
          <Checkbox
            id="agreement"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <label htmlFor="agreement">
            <TextBox typography="body4" color="black900">
              주문 내용을 확인하였으며,{' '}
              <TextBox
                typography="body4"
                color="primaryHover"
                cursor="pointer"
                onClick={handleClick}
              >
                구매 약관
              </TextBox>{' '}
              등에 동의합니다.
            </TextBox>
          </label>
        </StyledTermsAgreement>
        <Spacing space="16" />
        <StyledButton htmlType="submit" disabled={!isValidCouponRegistration}>
          <TextBox typography="h5" fontWeight="bold" color="white">
            구매하기
          </TextBox>
        </StyledButton>
        <Spacing space="16" />
      </StyledCouponWrap>
      {isModalOpen && (
        <AgreementModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
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
  max-height: 80vh;
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
  &:focus {
    background-color: ${colors.primaryActive};
  }
  &:active {
    background-color: ${colors.primaryActive};
  }
  &:disabled {
    background-color: ${colors.black600};
    color: ${colors.white};
  }
  &:disabled:hover {
    background-color: ${colors.black600};
    color: ${colors.white};
  }
`;

const StyledPreviewItemWrap = styled.div`
  overflow-y: auto;
`;

const StyledNotice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 24px;
`;
