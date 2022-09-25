import axios from 'axios';
import { Bill, BillCategory } from "./model";
import moment, { Moment } from "moment";
import React, { useContext, useMemo, useState } from "react";

interface ConditionType {
  months: Moment | null;
  category: string | null;
}

export const APP_DATA_CONTEXT = React.createContext<any>({});

export const appContextInit = () => {
  const [billList, setBillList] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<BillCategory[]>([]);
  const [addBillVisible, setAddBillVisible] = useState(false);
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

  const loadBillList = () => {
    axios.get("/bills").then((resp: { data: Bill[]; }) => {
      const list: Bill[] = resp.data;
      setBillList(list.sort((a, b) => b.time - a.time));
    });
  };

  const addBill = (val: any) => {
    val.time = moment(val.time).format("x");
    return axios.post("/bills", val);
  };


  return {
    billList: billListMemo,
    setBillList,
    categories,
    condition,
    setCategories,
    setCondition,
    addBillVisible,
    setAddBillVisible,
    loadBillList,
    addBill
  }
}

export const useAppContext=()=>{
  return useContext(APP_DATA_CONTEXT)as ReturnType<typeof appContextInit>
}
