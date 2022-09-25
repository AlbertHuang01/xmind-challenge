import { DatePicker, Form, InputNumber, message, Modal, Select } from "antd";
import { BILL_TYPE } from "./model";
import { AxiosResponse } from "axios";
import { useAppContext } from "./context";

export default function AddBill() {
  const { categories, addBillVisible, setAddBillVisible, addBill, loadBillList } =
  useAppContext();
  const [form] = Form.useForm();
  const onOk = () => {
    form.validateFields().then((value) => {
      (addBill(value) as Promise<AxiosResponse<any>>)
        .then(() => {
          setAddBillVisible(false);
          loadBillList();
        })
        .catch(() => {
          message.error("添加失败", 10);
        });
    });
  };
  const onCancel = () => {
    setAddBillVisible(false);
  };
  return (
    <Modal title="添加账单" open={addBillVisible} onOk={onOk} onCancel={onCancel}>
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
  );
}
