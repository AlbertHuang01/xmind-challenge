import { queryBillList, addBillItem, queryCategoryList } from './service';
import { Bill, BILL_TYPE, BillCategory } from './model';
import { createContext, useEffect, useMemo, useState, useContext } from "react";
import dayjs from 'dayjs';

interface Condition {
  date?: {
    year: number;
    month: number;
  },
  categoryId?: string
}

const context = createContext({})

export const Provicer = context.Provider

export function initContext() {
  const [billList, setBillList] = useState<Bill[]>([])
  const [categoryList, setCategoryList] = useState<BillCategory[]>([])
  const [condition, setCondition] = useState<Condition>(null)
  const [addBillVisible,setAddBillVisible]=useState(false)

  const billListFilted = useMemo(() => {
    let result = billList;
    if (condition) {
      const { date, categoryId } = condition
      if (date) {
        const { year, month } = date
        result = result.filter(bill => {
          const time = dayjs(bill.time)
          return time.year() === year && time.month() + 1 === month
        })
      }
      if (categoryId) {
        result = result.filter(bill => bill.category === categoryId)
      }
    }
    return result
  }, [billList, condition])

  const billListGroupByType = useMemo(() => {
    const income = billListFilted.filter(bill => bill.type === BILL_TYPE.INCOME).reduce((prev, curr) => prev + curr.amount, 0)
    const expenditure = billListFilted.filter(bill => bill.type === BILL_TYPE.EXPENDITURE).reduce((prev, curr) => prev + curr.amount, 0)
    return { income, expenditure }
  }, [billListFilted])

  const addBill = (bill: Bill) => {
    addBillItem(bill).then(() => {
      queryBillList().then(setBillList)
    })
  }

  useEffect(() => {
    queryBillList().then(setBillList)
    queryCategoryList().then(setCategoryList)
  }, [])

  return {
    billList: billListFilted,
    billListGroupByType,
    condition,
    setCondition,
    addBill,
    categoryList,
    addBillVisible,
    setAddBillVisible
  }
}

export const useAppContext = () => {
  return useContext(context) as ReturnType<typeof initContext>
}
