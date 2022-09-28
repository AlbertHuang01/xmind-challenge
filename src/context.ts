import dayjs,{ Dayjs } from 'dayjs';
import { getBillList, getCategories } from './service';
import { API } from './const';
import axios from 'axios';
import { AddBillModel, Bill, BillCategory } from "./model";
import React, { useContext, useEffect, useMemo, useState } from "react";

interface ConditionType {
  months: Dayjs | null;
  category: string | null;
}

export const APP_DATA_CONTEXT = React.createContext<any>({});

export const getBillListByCondition=(billList:Bill[], condition:ConditionType)=>{
  const { months, category } = condition;
  let result = billList;
  if (months) {
    const year = months.get("year");
    const month = months.get("months");
    result = result.filter((item) => {
      const itemMoment = dayjs(item.time);
      const itemYear = itemMoment.get("year");
      const itemMonth = itemMoment.get("month");
      return itemYear === year && itemMonth === month;
    });
  }
  if (category) {
    result = result.filter((item) => item.category === category);
  }
  return result;
}

export const appContextInit = () => {
  const [billList, setBillList] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<BillCategory[]>([]);
  const [addBillVisible, setAddBillVisible] = useState(false);
  const [condition, setCondition] = useState<ConditionType>({
    months: null,
    category: null,
  });

  const billListMemo = useMemo(() => {
    return getBillListByCondition(billList,condition)
  }, [billList, condition]);

  const addBill = (val: AddBillModel) => {
    if(val.time instanceof Dayjs){
      val.time = val.time.millisecond();
    }
    return axios.post(API.BILLS, val);
  };

  const loadBillList=()=> getBillList().then(data=>setBillList(data))

  useEffect(() => {
    loadBillList()
    getCategories().then(data=>setCategories(data))
  }, []);

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
