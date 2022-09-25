import { useEffect } from "react";
import axios from "axios";

import SearchForm from "./search-form";
import zhCN from "antd/lib/locale/zh_CN";
import { Card, ConfigProvider, Space } from "antd";
import "./main.css";
import BillList from "./bill-list";
import AddBill from "./add-bill";
import { GroupByCategoryType, GroupByIncomeAndExpenditure } from "./bill-list-group";
import { appContextInit, APP_DATA_CONTEXT } from "./context";

// 设置 axios 请求时的 baseURL
axios.defaults.baseURL = "http://127.0.0.1:3000";

export const APP_DATA = APP_DATA_CONTEXT

export function App() {
  const appContext=appContextInit()

  return (
    <ConfigProvider locale={zhCN}>
      <Card style={{ width: "80%", margin: "40px auto" }}>
        <APP_DATA.Provider
          value={appContext}
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
