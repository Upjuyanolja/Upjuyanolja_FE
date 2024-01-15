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
  couponTableData: tableData[];
  handleSelectRecord: (selectedRowKeys: number[]) => void;
  handleSelectCouponType: (value: string, key: number) => void;
  handleChangeDayLimit: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number,
  ) => void;
};
