import { Button, DatePicker, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";
import { APP_DATA } from "./main";

export default function SearchForm() {
  const [form] = useForm();

  const { categories, setCondition, setAddBillVisible } = useContext(APP_DATA);

  const onChange = () => {
    setCondition(form.getFieldsValue());
  };

  const onClick = () => {
    setAddBillVisible(true);
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
        <Button type={"primary"} onClick={onClick}>
          添加账单
        </Button>
      </Form.Item>
    </Form>
  );
}
