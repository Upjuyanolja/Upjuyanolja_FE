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
import {
  COUPON_TYPE_ALL_DAYS,
  COUPON_TYPE_WEEKDAYS,
  COUPON_TYPE_WEEKENDS,
} from '@/constants/coupon';

export const CouponTable = ({
  couponTableData,
  handleSelectRecord,
  handleSelectCouponType,
  handleChangeDayLimit,
}: couponTableProps) => {
  const couponTypeOption = [
    { value: COUPON_TYPE_ALL_DAYS.value, label: COUPON_TYPE_ALL_DAYS.label },
    { value: COUPON_TYPE_WEEKDAYS.value, label: COUPON_TYPE_WEEKDAYS.label },
    { value: COUPON_TYPE_WEEKENDS.value, label: COUPON_TYPE_WEEKENDS.label },
  ];
  const rowSelection = {
    onChange: handleSelectRecord,
  };

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
        <DayLimitInput
          dayLimit={dayLimit}
          isSoldOut={record.isSoldOut}
          handleChangeDayLimit={handleChangeDayLimit}
          record={record}
        />
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
          value={value}
          style={{ width: 70 }}
          options={couponTypeOption}
          disabled={record.isSoldOut}
          onChange={(value: string) => {
            handleSelectCouponType(value, record.key);
          }}
        />
      ),
    },
  ];

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
