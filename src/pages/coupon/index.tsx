import { colors } from '@/constants/colors';
import { CouponHeader } from '@components/domain/coupon/coupon-header';
import { Modal, Spin } from 'antd';
import styled from 'styled-components';
import { AdditionalPurchaseFooter } from '@components/domain/coupon/additional-purchase-footer';
import { AdditionalPurchaseContent } from '@components/domain/coupon/additional-purchase-content';
import { useCoupon } from '@hooks/coupon/useCoupon';
import { CouponTable } from '@components/domain/coupon/table';
import { PointModal } from '@components/domain/point-charge-modal/point-modal';
import { NotFoundCoupon } from '@components/domain/coupon/not-found-coupon';
import { RESPONSE_CODE } from '@/constants/api';
import { NotFound } from '@components/error/NotFound';
import { ServerError } from '@components/error/ServerError';

export const Coupon = () => {
  const {
    couponData,
    handleSelectStatus,
    handleSelectRecord,
    handleSelectCouponType,
    handleChangeDayLimit,
    handleDeleteButton,
    handleChangeDate,
    handleEditButton,
    handleModalOpen,
    isModalOpen,
    handleModalClose,
    handleBatchEditCheckbox,
    purchaseData,
    handleChangeBatchValue,
    handleChangeBuyQuantity,
    handlePurchaseButton,
    isPointModalOpen,
    setIsPointModalOpen,
    isGetCouponLoading,
    handleAgreeCheckbox,
    isAgreed,
    error,
  } = useCoupon();

  if (error?.response?.data.code === RESPONSE_CODE.NOT_ACCOMMODATION_OWNER)
    return <NotFound />;
  if (error !== null) return <ServerError />;
  if (isGetCouponLoading)
    return (
      <StyledLoadingLayout>
        <Spin tip="Loading..." size="large" />
      </StyledLoadingLayout>
    );

  if (couponData.coupons.length === 0)
    return (
      <>
        <CouponHeader
          expiry={''}
          handleSelectStatus={handleSelectStatus}
          handleDeleteButton={handleDeleteButton}
          handleChangeDate={handleChangeDate}
          handleEditButton={handleEditButton}
          handleModalOpen={handleModalOpen}
        />
        <NotFoundCoupon />
      </>
    );

  return (
    <>
      <CouponHeader
        expiry={couponData.expiry}
        handleSelectStatus={handleSelectStatus}
        handleDeleteButton={handleDeleteButton}
        handleChangeDate={handleChangeDate}
        handleEditButton={handleEditButton}
        handleModalOpen={handleModalOpen}
      />

      <CouponTable
        couponTableData={couponData.coupons}
        handleSelectRecord={handleSelectRecord}
        handleSelectCouponType={handleSelectCouponType}
        handleChangeDayLimit={handleChangeDayLimit}
      />
      <StyledModal
        open={isModalOpen}
        title="추가 구매"
        onCancel={handleModalClose}
        footer={
          <AdditionalPurchaseFooter
            totalPoints={purchaseData?.totalPoints}
            handlePurchaseButton={handlePurchaseButton}
            isAgreed={isAgreed}
            handleAgreeCheckbox={handleAgreeCheckbox}
          />
        }
      >
        <AdditionalPurchaseContent
          purchaseData={purchaseData}
          handleBatchEditCheckbox={handleBatchEditCheckbox}
          handleChangeBatchValue={handleChangeBatchValue}
          handleChangeBuyQuantity={handleChangeBuyQuantity}
        />
      </StyledModal>
      {isPointModalOpen && (
        <PointModal
          isModalOpen={isPointModalOpen}
          setIsModalOpen={setIsPointModalOpen}
        />
      )}
    </>
  );
};

const StyledLoadingLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

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
