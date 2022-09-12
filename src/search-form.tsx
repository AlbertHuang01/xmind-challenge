import { Button, DatePicker, Form, Select } from "antd";
import { BillCategory } from "./model";
import { useForm } from "antd/es/form/Form";

export default function SearchForm({
  categories,
  setCondition,
}: {
  categories: BillCategory[];
  setCondition: (a: any) => void;
}) {
  const [form] = useForm();

  const onChange = () => {
    setCondition(form.getFieldsValue());
  };

  return (
    <Form
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
