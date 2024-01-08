import { Button, Layout, Modal } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { PointModalProps } from '@components/modal/point/point-modal/types';
import { OrderInfo } from '../common/order-info';
import { OrderPointInfo } from '../common/order-point-info';
import { CompanyInfo } from '../common/company-info';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { colors } from '@/constants/colors';

export const CancelModal = ({
  isModalOpen,
  setIsModalOpen,
}: PointModalProps) => {


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledModal
        title="결제 취소 요청"
        open={isModalOpen}

        onCancel={handleCancel}
        footer={[]}
        width={576}
      >
        <Layout>
          <OrderInfo/>
          <OrderPointInfo pointCharge={true}/>
          <CompanyInfo/>
          <ModalFooterWrap>
            <h3>
              <ExclamationCircleFilled size={16} />

              <TextBox typography="body4" color={'black900'} fontWeight={'700'}>
                확인해주세요
              </TextBox>
            </h3>

            <li>
              <TextBox typography="body5" color={'black900'} fontWeight={'400'}>
                환불 및 결제취소는 구매 후 1주일 이내에 사용하지 않은 포인트
                구매 건에 대해서만 처리가 가능합니다.
              </TextBox>
            </li>

            <li>
              <TextBox typography="body5" color={'black900'} fontWeight={'400'}>
                환불 및 결제취소는 영업일 기준 최대 3~7일이 소요됩니다. 결제 시
                선택한 결제수단에 따라 환불이 불가능한 경우 고객센터를 통해
                계좌환불로 대체 처리될 수 있습니다.
              </TextBox>
            </li>
          </ModalFooterWrap>

          <SubmitButton type="primary" onClick={handleCancel}>
            취소 요청
          </SubmitButton>
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
  margin-bottom: 24px;
  padding: 0px;
  h3 {
    margin: 0px;
  }
  svg {
    color: ${colors.primary};

    margin-right: 8px;
  }
  li {
    line-height: 15px;
    margin-left: 16px;
  }
  li::marker {
    font-size: 12px;
  }
`;
const SubmitButton = styled(Button)`
  width: 100%;
  height: 46px;
  margin-top: 8px;
  padding: 8px 0px;

  font-size: 20px;
  font-weight: 700;
  line-height: 30px;

  &:disabled {
    background-color: ${colors.black600};
    color: white;
  }
`;
