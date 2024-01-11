import { colors } from '@/constants/colors';
import { CouponHeader } from '@components/coupon/coupon-header';
import { Modal } from 'antd';
import styled from 'styled-components';
import { AdditionalPurchaseFooter } from '@components/coupon/additional-purchase-footer';
import { AdditionalPurchaseContent } from '@components/coupon/additional-purchase-content';
import { useCoupon } from '@hooks/coupon/useCoupon';

import { CouponTable } from '@components/coupon/table';

export const Coupon = () => {
  const {
    couponData,
    couponStatusOption,
    couponTypeOption,
    couponTableData,
    handleStatusSelect,
    handleSelectRecord,
    handleSelectCouponType,
  } = useCoupon();
  if (!couponData) return <div>로딩 중</div>;

  console.log(couponTableData);

  return (
    <>
      <CouponHeader
        expiry={couponData.expiry}
        couponStatusOption={couponStatusOption}
        handleStatusSelect={handleStatusSelect}
      />

      <CouponTable
        couponTypeOption={couponTypeOption}
        couponTableData={couponTableData}
        handleSelectRecord={handleSelectRecord}
        handleSelectCouponType={handleSelectCouponType}
      />
      <StyledModal
        open={false}
        title="추가 구매"
        footer={<AdditionalPurchaseFooter />}
      >
        <AdditionalPurchaseContent />
      </StyledModal>
    </>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 576px;
  }
  .ant-modal-footer {
    height: 177px;
    padding: 24px;
  }
  .ant-modal-body {
    height: 364px;
    overflow-y: auto;
    padding: 24px;
  }
  .ant-modal-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-modal-header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-modal-close {
    top: 10px;
  }
  .ant-modal-title {
    font-size: 32px;
    font-weight: 700;
  }
  .ant-modal-close-icon {
    width: 20px;
    height: 20px;
    color: ${colors.black900};
  }
`;
