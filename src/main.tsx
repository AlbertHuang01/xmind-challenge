import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import moment, { Moment } from "moment";

import SearchForm from "./search-form";
import zhCN from "antd/es/locale/zh_CN";
import { Bill, BillCategory } from "./model";
import { Card, ConfigProvider, Space } from "antd";
import "antd/dist/antd.min.css";
import BillList from "./bill-list";

// 设置 axios 请求时的 baseURL
axios.defaults.baseURL = "http://127.0.0.1:3000";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);

interface ConditionType {
  months: Moment | null;
}

const defaultValue = {
  billList: [] as Bill[],
  categories: [] as BillCategory[],
  condition: {
    months: null,
  } as ConditionType,
  setCondition(_val: any) {},
};

type DefaultValueType = typeof defaultValue;

export const APP_DATA = React.createContext<DefaultValueType>(defaultValue);

function App() {
  const [billList, setBillList] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<BillCategory[]>([]);

  const [condition, setCondition] = useState<{
    months: Moment | null;
  }>({
    months: null,
  });

  const billListMemo = useMemo(() => {
    const { months } = condition;
    if (months) {
      const year = months.get("year");
      const month = months.get("months");
      return billList.filter((item) => {
        const itemMoment = moment(item.time);
        const itemYear = itemMoment.get("year");
        const itemMonth = itemMoment.get("month");
        return itemYear === year && itemMonth === month;
      });
    } else {
      return billList;
    }
  }, [billList, condition]);

  useEffect(() => {
    axios.get("/bills").then((resp) => {
      setBillList(resp.data);
    });
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
          }}
        >
          <Space direction={"vertical"} style={{ display: "flex" }}>
            <SearchForm />
            <BillList />
          </Space>
        </APP_DATA.Provider>
      </Card>
    </ConfigProvider>
  );
}
