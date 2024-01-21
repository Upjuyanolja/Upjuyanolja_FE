import { colors } from '@/constants/colors';
import { CouponHeader } from '@components/coupon/coupon-header';
import { Modal } from 'antd';
import styled from 'styled-components';
import { AdditionalPurchaseFooter } from '@components/coupon/additional-purchase-footer';
import { AdditionalPurchaseContent } from '@components/coupon/additional-purchase-content';
import { useCoupon } from '@hooks/coupon/useCoupon';
import { CouponTable } from '@components/coupon/table';
import { PointModal } from '@components/point-charge-modal/point-modal';
import { NotFoundCoupon } from '@components/coupon/not-found-coupon';

export const Coupon = () => {
  const {
    data,
    isGetCouponError,
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
  } = useCoupon();

  if (isGetCouponLoading) return <div>로딩</div>;
  if (data === null)
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
  if (isGetCouponError) return <div>에러</div>;

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
