import { Button, Checkbox, Modal, Layout, Form, Space, Input } from 'antd';

import { useState } from 'react';
import styled from 'styled-components';
import { numberFormat, removeNumberFormat } from './numberFormat';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';
import { InfoContainer } from './info-container';
const MINIMUM_PRICE = 10000;
const MAXIMUM_PRICE = 10000000;

export const PointDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formattedValue, setFormattedValue] = useState<string>('');
  const [pointErrorMessage, setPointErrorMessage] = useState<string>('');
  const [form] = Form.useForm<{ inputValue: string }>();
  const [isPointState, setIsPointState] = useState<boolean>(true);
  const [isAgreementPoint, setIsAgreementPoint] = useState(false);
  const [isInfoBoxState, setIsInfoBoxState] = useState(false);

  const handleChangePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/[0-9]/.test(removeNumberFormat(inputValue))) {
      setFormattedValue(numberFormat(inputValue));
    } else {
      setFormattedValue('');
    }

    priceComparator(inputValue);
  };

  const priceComparator = (inputValue: string) => {
    if (
      parseInt(removeNumberFormat(inputValue)) < MINIMUM_PRICE ||
      inputValue === ''
    ) {
      setPointErrorMessage('1회 최소 충전가능한 포인트는 10,000 포인트입니다.');
      setIsPointState(true);
    } else if (parseInt(removeNumberFormat(inputValue)) > MAXIMUM_PRICE) {
      setFormattedValue(numberFormat(`${MAXIMUM_PRICE}`));
      setIsPointState(false);
    } else {
      setPointErrorMessage('');
      setIsPointState(false);
    }
  };

  const handleClickAddPoint = (price: number) => {
    const result = parseInt(removeNumberFormat(formattedValue || '0')) + price;
    if (result > MAXIMUM_PRICE) {
      setFormattedValue(numberFormat(`${MAXIMUM_PRICE}`));
    } else {
      setFormattedValue(numberFormat(result.toString()));
      setPointErrorMessage('');
      setIsPointState(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormattedValue('');
    setPointErrorMessage('');
    setIsPointState(true);
    setIsAgreementPoint(false);
    setIsInfoBoxState(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>

      <CustomModal
        title="포인트 충전"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={576}
      >
        <Layout>
          <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item name="point" label="충전할 포인트">
              <Input
                style={{ width: '95%' }}
                placeholder="충전할 포인트를 입력해 주세요."
                value={formattedValue}
                onChange={handleChangePoint}
              />

              <TextBox
                typography="h5"
                color={'black900'}
                bold={true}
                style={{ marginLeft: '8px' }}
              >
                P
              </TextBox>
              <ErrorContainer>
                <TextBox typography="body4" color={'error'}>
                  {pointErrorMessage}
                </TextBox>
              </ErrorContainer>
            </Form.Item>

            <PointButtonWrap>
              <Button onClick={() => handleClickAddPoint(10000)}>+ 1만</Button>
              <Button onClick={() => handleClickAddPoint(50000)}>+ 5만</Button>
              <Button onClick={() => handleClickAddPoint(100000)}>
                + 10만
              </Button>
            </PointButtonWrap>

            <PriceWrap>
              {isInfoBoxState && <InfoContainer />}

              <InfoButton
                onClick={() => {
                  setIsInfoBoxState(!isInfoBoxState);
                }}
              >
                <ExclamationCircleOutlined />
              </InfoButton>

              <TextBox typography="h5" color={'primary'} bold={true}>
                결제 금액 : {formattedValue}원
              </TextBox>
            </PriceWrap>

            <AgreementWrap>
              <Checkbox
                onChange={() => {
                  setIsAgreementPoint(!isAgreementPoint);
                }}
                checked={isAgreementPoint}
              >
                <TextBox typography="body3" color={'black900'}>
                  주문 내용을 확인하였으며,{' '}
                  <TextBox typography="body3" color={'primaryHover'}>
                    구매 약관
                  </TextBox>
                  등에 동의합니다
                </TextBox>
              </Checkbox>
            </AgreementWrap>

            <SubmitButton
              key="submit"
              type="primary"
              onClick={handleOk}
              disabled={isPointState || !isAgreementPoint}
            >
              결제하기
            </SubmitButton>
          </Form>
        </Layout>
      </CustomModal>
    </>
  );
};
const CustomModal = styled(Modal)`
  .ant-layout {
    background-color: #ffffff;
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
const PointButtonWrap = styled(Space)`
  display: flex;
  margin-bottom: 221px;
  button {
    width: 64px;
    height: 25px;

    border: 1px solid #0351ff;
    margin-right: 4px;

    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: #0351ff;

    padding: 4px 0px;
  }
`;
const PriceWrap = styled(Space)`
  display: flex;
  justify-content: end;
  align-items: center;

  border: 2px solid #0351ff;
  padding: 4px 16px;
  margin-bottom: 16px;

  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: #0351ff;

  background: linear-gradient(268.34deg, #e0edff 1.74%, #ffffff 120.49%);
`;
const ErrorContainer = styled('div')`
  margin-top: 12px;
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
const AgreementWrap = styled(Space)`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const InfoButton = styled('button')`
  background: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
`;
