import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import SearchForm from "./search-form";
import zhCN from "antd/es/locale/zh_CN";
import { Bill, BillCategory } from "./model";
import { Card, ConfigProvider } from "antd";
import "antd/dist/antd.min.css";

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
      <SearchForm categories={categories} />

      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}
