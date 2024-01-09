import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';

export type tableData = {
  key: React.Key;
  room?: { name: string; price: string };
  status: string;
  name: string;
  dayLimit: number;
  quantity: number;
  couponType: string;
};
export type TableProps = {
  rowSelection: TableRowSelection<tableData> | undefined;
  columns: ColumnsType<tableData> | undefined;
  dataSource: readonly tableData[] | undefined;
  pagination: boolean;
};
