import { Layout, Modal } from 'antd';

import styled from 'styled-components';

import { TextBox } from '@components/text-box';

import { PointModalProps } from '@components/modal/point/point-modal/types';

import { OrderInfo } from '../common/order-info';
import { CouponInfo } from '../common/coupon-info';
import { OrderPointInfo } from '../common/order-point-info';
import { CompanyInfo } from '../common/company-info';

export const ReceiptModal = ({
  isModalOpen,
  setIsModalOpen,
}: PointModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomModal
        title="쿠폰 결제 영수증"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={576}
      >
        <Layout>
          <OrderInfo></OrderInfo>
          <CouponInfo></CouponInfo>
          <OrderPointInfo pointCharge={true}></OrderPointInfo>
          <CompanyInfo></CompanyInfo>
          <ModalFooterWrap>
            <TextBox typography="body5" color={'black900'} fontWeight={'400'}>
              영수증은 세금계산서 등 세무상 증빙서류로 활용할 수 없으며,
              거래내역 및 금액을 확인하는 용도로만 사용가능합니다
            </TextBox>

            <br />
            <TextBox typography="body5" color={'black900'} fontWeight={'400'}>
              영수증은 세금계산서 등 세무상 증빙서류로 활용할 수 없으며,
              거래내역 및 금액을 확인하는 용도로만 사용가능합니다
            </TextBox>
          </ModalFooterWrap>
        </Layout>
      </CustomModal>
    </>
  );
};

const CustomModal = styled(Modal)`
  .ant-layout {
    background-color: #ffffff;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .ant-modal-close {
    top: 2%;
  }
  .ant-form-item {
    margin-bottom: 12px;
  }
  .ant-modal-title {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
  }
  .ant-form-item-label {
    label {
      font-size: 20px;
      font-weight: 900;
      line-height: 30px;
    }
  }
  .ant-input-number-input-wrap {
    margin-right: 8px;
  }

  .point-buttonWrap {
    margin-bottom: 221px;
  }
`;

const ModalFooterWrap = styled('div')`
  line-height: 15px;

  margin-bottom: 24px;
`;
