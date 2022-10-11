import ReactDOM from "react-dom";
import { Button, Card, ConfigProvider, DatePicker, Form, Select, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import zhCN from "antd/lib/locale/zh_CN";
import './index.css';
import { initContext, Provicer, useAppContext } from './context'
import axios from "axios";
import { API } from "./service";
import { Bill, BILL_TYPE } from "./model";
import dayjs from "dayjs";

axios.defaults.baseURL = API.BASE_URL;

ReactDOM.render(<App />, document.getElementById("root"))

function App() {
  const contextValue = initContext()

  return (
    <ConfigProvider locale={zhCN}>
      <Card style={{ width: "80%", margin: "40px auto" }}>
        <Provicer value={contextValue}>
          <Space direction={"vertical"} style={{ display: "flex" }}>
            <SearchForm />
            <BillList />
          </Space>
          <BillListGroup/>
        </Provicer>
      </Card>
    </ConfigProvider>
  );
}

// 条件查询的表单
function SearchForm() {
  const [form] = Form.useForm();

  const { categoryList, setCondition, setAddBillVisible } = useAppContext();

  const onChange = () => {
    setCondition(form.getFieldsValue());
  };

  const onClick = () => {
    setAddBillVisible(true);
  };

  return <Form
    layout={"inline"}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    form={form}
    autoComplete="off"
  >
    <Form.Item label="月份" name="months">
      <DatePicker onChange={onChange} picker="month" allowClear />
    </Form.Item>
    <Form.Item label="账单分类" name="category">
      <Select
        style={{ width: 140 }}
        onChange={onChange}
        allowClear
        placeholder={"请选择账单分类"}
      >
        {categoryList.map((category) => (
          <Select.Option key={category.id}>{category.name}</Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item>
      <Button type={"primary"} onClick={onClick}>
        添加账单
      </Button>
    </Form.Item>
  </Form>
}

// 账单列表
function BillList() {
  const { categoryList: categories, billList } = useAppContext();

  const columns: ColumnsType<Bill> = [
    {
      title: "账单时间",
      dataIndex: "time",
      key: "time",
      render: (val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
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

// 账单列表分组
function BillListGroup() {
  const { billListGroupByType,billListGroupByCategory } = useAppContext();
  const { Title, Paragraph } = Typography
  return <>
  <Typography>
    <Title level={3}>收入支出分组统计</Title>
    <Paragraph>收入：{billListGroupByType.income} ￥</Paragraph>
    <Paragraph>支出：{billListGroupByType.expenditure} ￥</Paragraph>
  </Typography>
  <Typography>
      <Title level={3}>账单分类分组统计</Title>
      <Paragraph>
        <ul>
          {billListGroupByCategory.map((item) => (
            <li key={item.name}>
              {item.name}：{item.totalAmount}￥
            </li>
          ))}
        </ul>
      </Paragraph>
    </Typography>
  </>
}
