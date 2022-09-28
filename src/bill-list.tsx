import { ColumnsType } from "antd/es/table";
import { Bill, BILL_TYPE } from "./model";
import { Table } from "antd";
import { useAppContext } from "./context";
import dayjs from 'dayjs'

export default function BillList() {
  const { categories, billList } = useAppContext();

  const columns: ColumnsType<Bill> = [
    {
      title: "账单时间",
      dataIndex: "time",
      key: "time",
      render: (val) =>dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "账单类型",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => {
        if (type === BILL_TYPE.EXPENDITURE) {
          return "支出";
        } else if (type === BILL_TYPE.INCOME) {
          return "收入";
        }
        return "";
      },
    },
    {
      title: "账单分类",
      dataIndex: "category",
      key: "category",
      render: (_, { category }) => {
        const find = categories.find((item) => item.id === category);
        return find?.name;
      },
    },
    { title: "账单金额", dataIndex: "amount", key: "amount" },
  ];

  const rowKey = ({ time, type, category, amount }: Bill) => {
    return `${time}-${type}-${category}-${amount}`;
  };

  return <Table rowKey={rowKey} columns={columns} size={"small"} dataSource={billList} />;
}
