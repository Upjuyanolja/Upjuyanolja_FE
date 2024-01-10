import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';

export type tableData = {
  room: {
    name: string;
    price: number;
    id: number;
    length: number;
  };
  key: number;
  couponId: number;
  status: 'ENABLE' | 'DISABLED' | 'SOLD_OUT';
  info: {
    name: string;
    appliedPrice: number;
  };
  dayLimit: number;
  quantity: number;
  couponType: 'ALL_DAYS' | 'WEEKDAYS' | 'WEEKENDS';
  discount: number;
  discountType: 'FLAT' | 'RATE';
  isSoldOut: boolean;
};

export type TableProps = {
  rowSelection: TableRowSelection<tableData> | undefined;
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
};
