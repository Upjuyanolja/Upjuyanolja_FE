import { colors } from '@/constants/colors';
import Table, { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';
import {
  CouponNameContainer,
  DayLimitInput,
  RoomContainer,
} from '../table-cell';
import { CouponStatusTag } from '../coupon-status-tag';
import { Select } from 'antd';
import { TextBox } from '@components/text-box';
import { TableProps, couponTableProps, tableData } from './type';
import {
  couponNameContainerProps,
  roomContainerProps,
} from '../table-cell/type';

export const CouponTable = ({
  couponTypeOption,
  couponTableData,
}: couponTableProps) => {
  const columns: ColumnsType<tableData> = [
    {
      title: '객실 정보',
      dataIndex: 'room',
      render: (room: roomContainerProps['room']) => (
        <RoomContainer room={room} />
      ),
      onCell: (record) => {
        return { rowSpan: record.room.length };
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
      dataIndex: 'info',
      render: (info: couponNameContainerProps['info'], record: tableData) => (
        <CouponNameContainer info={info} isSoldOut={record.isSoldOut} />
      ),
    },
    {
      title: '일일 제한 수량',
      dataIndex: 'dayLimit',
      render: (dayLimit: number, record: tableData) => (
        <DayLimitInput dayLimit={dayLimit} isSoldOut={record.isSoldOut} />
      ),
    },
    {
      title: '잔여 수량',
      dataIndex: 'quantity',
      render: (quantity: string, record: tableData) => (
        <TextBox
          typography="body2"
          fontWeight={400}
          color={record.isSoldOut ? 'black600' : 'black900'}
        >
          {quantity}장
        </TextBox>
      ),
    },
    {
      title: '노출 기준',
      dataIndex: 'couponType',
      render: (value: string, record: tableData) => (
        <Select
          defaultValue={value}
          style={{ width: 70 }}
          options={couponTypeOption}
          disabled={record.isSoldOut}
        />
      ),
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
  return (
    <StyledTable
      rowSelection={rowSelection}
      columns={columns}
      dataSource={couponTableData}
      pagination={false}
    />
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
      padding: 8px;
    }
  }
  .ant-checkbox-inner {
    border: 1px solid ${colors.primary};
  }
`;
