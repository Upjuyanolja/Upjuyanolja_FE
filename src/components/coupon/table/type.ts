/* eslint-disable no-unused-vars */
import { ColumnsType } from 'antd/lib/table';
import { RowSelectMethod } from 'antd/lib/table/interface';

export type tableData = {
  room: {
    name: string;
    price: number;
    id: number;
    length: number;
  };
  key: number;
  couponId: number;
  status: string;
  info: {
    name: string;
    appliedPrice: number;
  };
  dayLimit: number;
  quantity: number;
  couponType: string;
  discount: number;
  discountType: 'FLAT' | 'RATE';
  isSoldOut: boolean;
};

export type TableProps = {
  rowSelection:
    | {
        onChange?: (
          selectedRowKeys: number[],
          selectedRows: tableData[],
          info: {
            type: RowSelectMethod;
          },
        ) => void;
      }
    | undefined;
  columns: ColumnsType<tableData> | undefined;
  dataSource: readonly tableData[] | undefined;
  pagination: boolean;
};

export type couponTableProps = {
  couponTypeOption: (
    | {
        value: 'ALL_DAYS';
        label: '상시';
      }
    | {
        value: 'WEEKDAYS';
        label: '주중';
      }
    | {
        value: 'WEEKENDS';
        label: '휴일';
      }
  )[];
  couponTableData: tableData[];
  handleSelectRecord: (selectedRowKeys: number[]) => void;
  handleSelectCouponType: (value: string, key: number) => void;
};
