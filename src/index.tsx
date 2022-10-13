import ReactDOM from "react-dom";
import { Button, Card, ConfigProvider, DatePicker, Form, InputNumber, message, Modal, Select, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import zhCN from "antd/lib/locale/zh_CN";
import './index.css';
import { initContext, Provicer, useAppContext } from './context'
import axios from "axios";
import { API } from "./service";
import { Bill, BILL_TYPE } from "./model";
import dayjs from "dayjs";
import { fireEvent, screen } from '@testing-library/react'
import { useEffect } from "react";

axios.defaults.baseURL = API.BASE_URL;

if (process.env.NODE_ENV !== 'test') {
  ReactDOM.render(<App />, document.getElementById("root"))
}

export function App() {
  const contextValue = initContext()

  return (
    <ConfigProvider locale={zhCN}>
      <Card style={{ width: "80%", margin: "40px auto" }}>
        <Provicer value={contextValue}>
          <Space direction={"vertical"} style={{ display: "flex" }}>
            <SearchForm />
            <BillList />
          </Space>
          <BillListGroup />
          <AddBillModal />
        </Provicer>
      </Card>
    </ConfigProvider>
  );
}

// 条件查询的表单
export function SearchForm() {
  const [form] = Form.useForm();

  const { categoryList, setCondition, condition, setAddBillVisible } = useAppContext();

  const onChange = () => {
    const { category, months } = form.getFieldsValue()
    setCondition({
      categoryId: category,
      date: {
        year: months.year(),
        month: months.month() + 1,
      }
    });
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
      <Button type={"primary"} onClick={onClick} data-testid="search-button">
        添加账单
      </Button>
    </Form.Item>
  </Form>
}

// 账单列表
export function BillList() {
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
export function BillListGroup() {
  const { billListGroupByType, billListGroupByCategory } = useAppContext();
  const { Title, Paragraph } = Typography

  return <>
    <Typography>
      <Title level={3}>收入支出分组统计</Title>
      <Paragraph data-testid="income">收入：{billListGroupByType.income} ￥</Paragraph>
      <Paragraph data-testid="expenditure">支出：{billListGroupByType.expenditure} ￥</Paragraph>
    </Typography>
    <Typography>
      <Title level={3}>账单分类分组统计</Title>
      <Paragraph>
        <ul>
          {billListGroupByCategory.map((item) => (
            <li key={item.name} data-testid="bill-group-item">
              {item.name}：{item.totalAmount}￥
            </li>
          ))}
        </ul>
      </Paragraph>
    </Typography>
  </>
}

// 添加账单的弹框
export function AddBillModal() {
  const { categoryList: categories, addBillVisible, setAddBillVisible, addBill } =
    useAppContext();

  const [form] = Form.useForm();

  const onOk = () => {
    form.validateFields().then((value) => {
      try {
        addBill(value)
      } catch (e) {
        message.error("添加失败", 10);
      }
    });
  };

  const onCancel = () => {
    setAddBillVisible(false);
  };

  return <Modal title="添加账单" open={addBillVisible} onOk={onOk} onCancel={onCancel}>
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} autoComplete="off">
      <Form.Item
        label="账单时间"
        name="time"
        rules={[{ required: true, message: "账单时间是必须的" }]}
      >
        <DatePicker allowClear style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="账单类型"
        name="type"
        rules={[{ required: true, message: "账单类型是必须的" }]}
      >
        <Select allowClear placeholder={"账单类型"}>
          <Select.Option value={BILL_TYPE.INCOME}>收入</Select.Option>
          <Select.Option value={BILL_TYPE.EXPENDITURE}>支出</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="账单分类" name="category">
        <Select allowClear placeholder={"请选择账单分类"}>
          {categories.map((category) => (
            <Select.Option key={category.id}>{category.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="账单金额"
        name="amount"
        rules={[{ required: true, message: "账单金额是必须的" }]}
        initialValue={0}
      >
        <InputNumber addonAfter="￥" min={1} style={{ width: "100%" }} />
      </Form.Item>
    </Form>
  </Modal>
}
