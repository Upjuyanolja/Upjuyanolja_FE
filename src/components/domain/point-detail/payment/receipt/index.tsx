import { Layout, Modal } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/atom/text-box';
import { OrderInfo } from '../common/order-info';
import { CouponInfo } from '../common/coupon-info';
import { OrderPointInfo } from '../common/order-point-info';
import { CompanyInfo } from '../common/company-info';
import { PointModalReceiptProps } from './types';
import { useRecoilValue } from 'recoil';
import { pointDetailDataState } from '@stores/point-detail/atoms';
import { useEffect, useState } from 'react';

export const ReceiptModal = ({
  isModalOpen,
  setIsModalOpen,
  index,
}: PointModalReceiptProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const pointDetailData = useRecoilValue(pointDetailDataState);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    if (pointDetailData.histories[index].type === '취소') {
      setModalTitle('결제 취소 영수증');
    } else {
      setModalTitle(`${pointDetailData.histories[index].type} 결제 영수증`);
    }
  }, [pointDetailData.histories, index]);
  return (
    <>
      <StyledModal
        title={modalTitle}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        width={576}
      >
        <Layout>
          <OrderInfo index={index} />
          {pointDetailData.histories[index].type === '쿠폰' && (
            <CouponInfo index={index} />
          )}

          <OrderPointInfo
            index={index}
            pointCharge={pointDetailData.histories[index].type !== '쿠폰'}
            status={pointDetailData.histories[index].status}
          />
          <CompanyInfo />
          <ModalFooterWrap>
            <li>
              <TextBox typography="body5" color={'black900'} fontWeight={'400'}>
                영수증은 세금계산서 등 세무상 증빙서류로 활용할 수 없으며,
                거래내역 및 금액을 확인하는 용도로만 사용가능합니다
              </TextBox>
            </li>
            <li>
              <TextBox typography="body5" color={'black900'} fontWeight={'400'}>
                영수증은 결제 완료 시 자동으로 발급되며, 포인트 충전내역에서
                확인이 가능합니다.
              </TextBox>
            </li>
            {pointDetailData.histories[index].type === '취소' && (
              <li>
                <TextBox
                  typography="body5"
                  color={'black900'}
                  fontWeight={'400'}
                >
                  환불 및 결제취소는 영업일 기준 최대 3~7일이 소요됩니다. 결제
                  시 선택한 결제수단에 따라 환불이 불가능한 경우 고객센터를 통해
                  계좌환불로 대체 처리될 수 있습니다.
                </TextBox>
              </li>
            )}
          </ModalFooterWrap>
        </Layout>
      </StyledModal>
    </>
  );
};

const StyledModal = styled(Modal)`
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
  .ant-modal-body {
    height: 540px;
    overflow-y: auto;
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

const ModalFooterWrap = styled('ul')`
  line-height: 15px;

  margin-bottom: 24px;
  padding-left: 16px;

  li::marker {
    font-size: 12px;
  }
`;
