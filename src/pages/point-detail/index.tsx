import {
  Button,
  Checkbox,
  Modal,
  Layout,
  Typography,
  InputNumber,
  Form,
  Space,
} from 'antd';

import { useState } from 'react';
import styled from 'styled-components';

export const PointDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [point, setPoint] = useState<number | null>();
  const [form] = Form.useForm<{ point: number }>();
  // const handleChangePoint = (e: React.ChangeEvent) => {
  //   if (e.currentTarget) {
  //     setPoint(e.currentTarget)
  //   }
  // };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            style={{ backgroundColor: 'white' }}
          >
            <Form.Item name="point" label="충전할 포인트">
              <InputNumber
                style={{ width: '95%' }}
                controls={false}
                placeholder="충전할 포인트를 입력해 주세요."
              />
              <span style={{ marginLeft: '8px' }}>P</span>
            </Form.Item>

            <Space className="point-buttonWrap">
              <Button>+ 1만</Button>
              <Button>+ 5만</Button>
              <Button>+ 10만</Button>
            </Space>

            <Space className="price-wrap">
              <Typography>결제 금액 : 0원</Typography>
            </Space>

            <Space className="agreement-wrap">
              <Checkbox>
                <Typography>
                  주문 내용을 확인하였으며, 구매 약관 등에 동의합니다
                </Typography>
              </Checkbox>
            </Space>

            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              style={{
                width: '100%',
                height: '46px',
                marginTop: '8px',
                padding: '8px 0px',
              }}
            >
              결제하기
            </Button>
          </Form>
        </Layout>
      </CustomModal>
    </>
  );
};
const CustomModal = styled(Modal)`
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
  .ant-space {
    display: flex;

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
  }
  .point-buttonWrap {
    margin-bottom: 221px;
  }
  .price-wrap {
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
  }
  .agreement-wrap {
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;
