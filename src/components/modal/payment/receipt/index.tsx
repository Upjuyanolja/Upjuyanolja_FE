import { Button, Checkbox, Form, Input, Layout, Modal, Space } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { numberFormat, removeNumberFormat } from '@/utils/Format/numberFormat';
import { TextBox } from '@components/text-box';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { colors } from '@/constants/colors';
import { PointModalProps } from '@components/modal/point/point-modal/types';

export const ReceiptModal = ({
  isModalOpen,
  setIsModalOpen,
}: PointModalProps) => {
  const [form] = Form.useForm<{ inputValue: string }>();

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
          <OrderInfoWrap direction="vertical">
            <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
              주문번호: 23459-1
            </TextBox>

            <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
              거래일시: 2023.12.20. 18:06
            </TextBox>
          </OrderInfoWrap>
          <CouponInfoWrap direction="vertical">
            <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
              결제 쿠폰
            </TextBox>
            <CouponDetailBox>
              <TextBox
                typography="body2"
                color={'black900'}
                fontWeight={'700'}
                className="couponDetail-title"
              >
                5% 할인쿠폰
              </TextBox>
              <TextBox typography="body2" color={'black900'} fontWeight={'400'}>
                패캠스테이 삼성점|슽낸다드, 스탠다드 더블, 프리미엄
              </TextBox>
              <TextBox typography="body2" color={'black900'} fontWeight={'400'}>
                주문수량: 100개
              </TextBox>
            </CouponDetailBox>
          </CouponInfoWrap>
          <OrderPointInfo direction="vertical">
            <OrderPointInfoList>
              <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
                결제 포인트
              </TextBox>
              <TextBox typography="body2" color={'primary'} fontWeight={'700'}>
                5000 P
              </TextBox>
            </OrderPointInfoList>
            <OrderPointInfoList>
              <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
                보유 포인트
              </TextBox>
              <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
                5000 P
              </TextBox>
            </OrderPointInfoList>
            <OrderPointInfoList>
              <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
                추가 충전 포인트
              </TextBox>
              <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
                5000 P
              </TextBox>
            </OrderPointInfoList>
          </OrderPointInfo>
          <CompanyBox>
            <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
              회사명 : 빨리잡아
            </TextBox>
          </CompanyBox>
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

const OrderInfoWrap = styled(Space)`
  margin-bottom: 36px;
`;
const CouponInfoWrap = styled(Space)`
  margin-bottom: 36px;
`;
const CouponDetailBox = styled('div')`
  width: 100%;

  display: flex;
  flex-direction: column;

  border: 2px solid #0351ff;
  border-radius: 8px;

  padding: 8px;
  .couponDetail-title {
    margin-bottom: 8px;
  }
`;

const OrderPointInfo = styled(Space)`
  margin-bottom: 16px;
`;

const OrderPointInfoList = styled(Space)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyBox = styled('div')`
  width: 100%;
  display: flex;
  justify-content: end;

  padding: 8px;
  margin-bottom: 24px;

  border-radius: 8px;

  background-color: ${colors.midGray};
`;
const ModalFooterWrap = styled('div')`
  line-height: 15px;

  margin-bottom: 24px;
`;
