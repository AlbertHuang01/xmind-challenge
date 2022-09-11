import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import SearchForm from "./search-form";
import zhCN from "antd/es/locale/zh_CN";
import { Bill, BillCategory } from "./model";
import { Card, ConfigProvider, Space } from "antd";
import "antd/dist/antd.min.css";
import BillList from "./bill-list";

// 设置 axios 请求时的 baseURL
axios.defaults.baseURL = "http://127.0.0.1:3000";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);

function App() {
  const [billList, setBillList] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<BillCategory[]>([]);

  useEffect(() => {
    axios.get("/bills").then((resp) => {
      setBillList(resp.data);
    });
    axios.get("/categories").then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  return (
    <Card style={{ width: "80%", margin: "40px auto" }}>
      <Space direction={"vertical"} style={{ display: "flex" }}>
        <SearchForm categories={categories} />
        <BillList billList={billList} categories={categories} />
      </Space>
    </Card>
  );
}
