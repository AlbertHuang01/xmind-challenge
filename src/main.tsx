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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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
    <>
      <ConfigProvider locale={zhCN}>
        <Card style={{ width: "80%", margin: "40px auto" }}>
          <Space direction={"vertical"} style={{ display: "flex" }}>
            <SearchForm categories={categories} setCondition={setCondition} />
            <BillList billList={billListMemo} categories={categories} />
          </Space>
        </Card>
      </ConfigProvider>
    </>
  );
}
