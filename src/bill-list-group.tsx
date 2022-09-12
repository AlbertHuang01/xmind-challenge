import { useContext } from "react";
import { APP_DATA } from "./main";
import { BILL_TYPE } from "./model";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export function GroupByIncomeAndExpenditure() {
  const { billList } = useContext(APP_DATA);

  const income = billList
    .filter((bill) => bill.type === BILL_TYPE.INCOME)
    .reduce((pre, curr) => pre + curr.amount, 0);
  const expenditure = billList
    .filter((bill) => bill.type === BILL_TYPE.EXPENDITURE)
    .reduce((pre, curr) => pre + curr.amount, 0);

  return (
    <Typography>
      <Title>收入支出分统计</Title>
      <Paragraph>收入：{income} ￥</Paragraph>
      <Paragraph>支出：{expenditure} ￥</Paragraph>
    </Typography>
  );
}

export function GroupByCategoryType() {
  const { billList, categories } = useContext(APP_DATA);
  const group = categories
    .map((category) => {
      const foundBills = billList.filter((bill) => bill.category === category.id);
      const totalAmount = foundBills.reduce((pre, curr) => pre + curr.amount, 0);
      return {
        name: category.name,
        totalAmount,
      };
    })
    .sort((a, b) => a.totalAmount - b.totalAmount);

  return (
    <Typography>
      <Title>账单分类分组统计</Title>
      <Paragraph>
        <ul>
          {group.map((item) => (
            <li key={item.name}>
              {item.name}：{item.totalAmount}￥
            </li>
          ))}
        </ul>
      </Paragraph>
    </Typography>
  );
}
