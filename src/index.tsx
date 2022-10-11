import ReactDOM from "react-dom";
import { Button, Card, ConfigProvider, DatePicker, Form, Select, Space } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import './index.css';
import {initContext, Provicer, useAppContext} from './context'
import axios from "axios";
import { API } from "./service";

axios.defaults.baseURL = API.BASE_URL;

ReactDOM.render(<App/>,document.getElementById("root"))

function App() {
  const contextValue=initContext()

  return (
    <ConfigProvider locale={zhCN}>
      <Card style={{ width: "80%", margin: "40px auto" }}>
        <Provicer value={contextValue}>
          <Space direction={"vertical"} style={{ display: "flex" }}>
            <SearchForm />
          </Space>
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
