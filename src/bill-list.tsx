import { ColumnsType } from "antd/es/table";
import { Bill, BillCategory } from "./model";
import { Table } from "antd";

interface BillListProps {
  billList: Bill[];
  categories: BillCategory[];
}

export default function BillList({ billList, categories }: BillListProps) {
  const columns: ColumnsType<Bill> = [
    { title: "账单时间", dataIndex: "time", key: "time" },
    {
      title: "账单类型",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => {
        if (type === 0) {
          return "支出";
        } else if (type === 1) {
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
