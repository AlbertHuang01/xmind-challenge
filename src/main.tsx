import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment, { Moment } from "moment";

import SearchForm from "./search-form";
import zhCN from "antd/es/locale/zh_CN";
import { Bill, BillCategory } from "./model";
import { Card, ConfigProvider, Space } from "antd";
import "antd/dist/antd.min.css";
import BillList from "./bill-list";
import AddBill from "./add-bill";
import { GroupByCategoryType, GroupByIncomeAndExpenditure } from "./bill-list-group";

// 设置 axios 请求时的 baseURL
axios.defaults.baseURL = "http://127.0.0.1:3000";

interface ConditionType {
  months: Moment | null;
  category: string | null;
}

const defaultValue = {
  billList: [] as Bill[],
  categories: [] as BillCategory[],
  condition: {
    months: null,
  } as ConditionType,
  setCondition(_val: any) {},
  addBillVisible: false,
  setAddBillVisible(val: boolean) {},
  addBill(val: any): any {},
  loadBillList() {},
};

type DefaultValueType = typeof defaultValue;

export const APP_DATA = React.createContext<DefaultValueType>(defaultValue);

export function App() {
  const [billList, setBillList] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<BillCategory[]>([]);
  const [addBillVisible, setAddBillVisible] = useState(defaultValue.addBillVisible);
  const [condition, setCondition] = useState<ConditionType>({
    months: null,
    category: null,
  });

  const billListMemo = useMemo(() => {
    const { months, category } = condition;
    let result = billList;
    if (months) {
      const year = months.get("year");
      const month = months.get("months");
      result = result.filter((item) => {
        const itemMoment = moment(item.time);
        const itemYear = itemMoment.get("year");
        const itemMonth = itemMoment.get("month");
        return itemYear === year && itemMonth === month;
      });
    }
    if (category) {
      result = result.filter((item) => item.category === category);
    }
    return result;
  }, [billList, condition]);

  const addBill = (val: any) => {
    val.time = moment(val.time).format("x");
    return axios.post("/bills", val);
  };

  const loadBillList = () => {
    axios.get("/bills").then((resp) => {
      const list: Bill[] = resp.data;
      setBillList(list.sort((a, b) => b.time - a.time));
    });
  };

  useEffect(() => {
    loadBillList();
    axios.get("/categories").then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Card style={{ width: "80%", margin: "40px auto" }}>
        <APP_DATA.Provider
          value={{
            billList: billListMemo,
            categories,
            condition,
            setCondition,
            addBillVisible,
            setAddBillVisible,
            addBill,
            loadBillList,
          }}
        >
          <Space direction={"vertical"} style={{ display: "flex" }}>
            <SearchForm />
            <BillList />
          </Space>
          <AddBill />
          <GroupByIncomeAndExpenditure />
          <GroupByCategoryType />
        </APP_DATA.Provider>
      </Card>
    </ConfigProvider>
  );
}
