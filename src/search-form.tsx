import { Button, DatePicker, Form, Select } from "antd";
import { BillCategory } from "./model";

export default function SearchForm({ categories }: { categories: BillCategory[] }) {
  const onChange = () => {};

  return (
    <Form
      layout={"inline"}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item label="月份" name="month">
        <DatePicker onChange={onChange} picker="month" allowClear />
      </Form.Item>
      <Form.Item label="账单分类" name="category">
        <Select
          style={{ width: 140 }}
          onChange={onChange}
          allowClear
          placeholder={"请选择账单分类"}
        >
          {categories.map((category) => (
            <Select.Option key={category.id}>{category.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type={"primary"}>添加账单</Button>
      </Form.Item>
    </Form>
  );
}
