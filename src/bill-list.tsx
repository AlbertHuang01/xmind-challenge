import { ColumnsType } from "antd/es/table";
import { Bill, BillCategory } from "./model";
import { Table } from "antd";
import { useContext } from "react";
import { APP_DATA } from "./main";
import moment from "moment";

interface BillListProps {
  billList: Bill[];
  categories: BillCategory[];
}

export default function BillList() {
  const { categories, billList } = useContext(APP_DATA);

  const columns: ColumnsType<Bill> = [
    {
      title: "账单时间",
      dataIndex: "time",
      key: "time",
      render: (val) => moment(val).format("yyyy-MM-DD HH:mm:ss"),
    },
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
