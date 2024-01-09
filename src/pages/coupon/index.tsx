import { colors } from '@/constants/colors';
import { CouponHeader } from '@components/coupon/coupon-header';
import { Input, Modal, Select, Table } from 'antd';
import styled from 'styled-components';
import { TableProps, tableData } from './type';
import { TextBox } from '@components/text-box';
import { ColumnsType } from 'antd/lib/table';
import { CouponStatusTag } from '@components/coupon/coupon-status-tag';
import { AdditionalPurchaseFooter } from '@components/coupon/additional-purchase-footer';
import { AdditionalPurchaseContent } from '@components/coupon/additional-purchase-content';

const columns: ColumnsType<tableData> = [
  {
    title: '객실 정보',
    dataIndex: 'room',
    render: (room: { name: string; price: string }) => (
      <StyledRoomContainer>
        <TextBox fontWeight={700} typography="body2">
          {room.name}
        </TextBox>
        <TextBox fontWeight={400} typography="body4">
          {room.price}
        </TextBox>
      </StyledRoomContainer>
    ),
    onCell: (_, index) => {
      if (index === 0) return { rowSpan: 3 };
      if (index === 1) return { rowSpan: 0 };
      if (index === 2) return { rowSpan: 0 };
      if (index === 3) return { rowSpan: 2 };
      if (index === 4) return { rowSpan: 0 };
      return {};
    },
  },
  Table.SELECTION_COLUMN,
  {
    title: '쿠폰 상태',
    dataIndex: 'status',
    render: (status: string) => {
      return <CouponStatusTag status={status} />;
    },
  },
  {
    title: '쿠폰 종류',
    dataIndex: 'name',
    render: (text: string) => (
      <StyledCouponNameContainer>
        <TextBox fontWeight={700} typography="body2">
          {text}
        </TextBox>
        <TextBox color="black600" typography="body4" fontWeight={400}>
          (적용가 99,000원)
        </TextBox>
      </StyledCouponNameContainer>
    ),
  },
  {
    title: '일일 제한 수량',
    dataIndex: 'dayLimit',
    render: (text: string) => (
      <>
        <Input style={{ width: '56px' }} defaultValue={text} />
        <TextBox typography="body2" fontWeight={400}>
          장
        </TextBox>
      </>
    ),
  },
  {
    title: '잔여 수량',
    dataIndex: 'quantity',
    render: (text: string) => (
      <TextBox typography="body2" fontWeight={400}>
        {text}장
      </TextBox>
    ),
  },
  {
    title: '노출 기준',
    dataIndex: 'couponType',
    render: (value: string) => (
      <Select
        defaultValue={value}
        style={{ width: 70 }}
        options={[
          {
            value: '평일',
            label: '평일',
          },
          {
            value: '휴일',
            label: '휴일',
          },
          {
            value: '상시',
            label: '상시',
          },
        ]}
      />
    ),
  },
];

const data: tableData[] = [
  {
    room: { name: '스탠다드 룸', price: '10,000원' },
    key: '1',
    status: '발급 중',
    name: '1,000원 쿠폰',
    dayLimit: 3,
    quantity: 45,
    couponType: '휴일',
  },
  {
    room: { name: '스탠다드 룸', price: '10,000원' },
    key: '2',
    status: '발급 중지',
    name: '2,000원 쿠폰',
    dayLimit: 4,
    quantity: 48,
    couponType: '상시',
  },
  {
    room: { name: '스탠다드 룸', price: '10,000원' },
    key: '3',
    status: '발급 중',
    name: '3,000원 쿠폰',
    dayLimit: 5,
    quantity: 48,
    couponType: '주중',
  },
  {
    room: { name: '트윈 룸', price: '10,000원' },
    key: '4',
    status: '발급 중지',
    name: '100,000원 쿠폰',
    dayLimit: 5,
    quantity: 45,
    couponType: '휴일',
  },
  {
    room: { name: '트윈 룸', price: '10,000원' },
    key: '5',
    status: '소진',
    name: '1,000원 쿠폰',
    dayLimit: 3,
    quantity: 35,
    couponType: '휴일',
  },
];
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: tableData[]) => {
    // console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   'selectedRows: ',
    //   selectedRows,
    // );
    // 이 부분은 로직 구현하면서 수정 할 예정이라 남기겠습니다!
  },
};

export const Coupon = () => {
  return (
    <>
      <CouponHeader />
      <StyledTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />

      <StyledModal
        open={true}
        title="추가 구매"
        footer={<AdditionalPurchaseFooter />}
      >
        <AdditionalPurchaseContent />
      </StyledModal>
    </>
  );
};
const StyledTable = styled(Table)<TableProps>`
  .ant-table-thead {
    background-color: ${colors.black100};
    .ant-table-cell {
      border-bottom: 1px solid ${colors.primary};
      color: ${colors.primary};
      font-weight: 700;
      font-size: 16px;
    }
  }
  .ant-checkbox-inner {
    border: 1px solid ${colors.primary};
  }
`;

const StyledRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCouponNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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
