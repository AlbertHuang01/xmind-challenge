import { queryBillList } from './service';
import { Bill, BILL_TYPE } from './model';
import { createContext, useEffect, useMemo, useState } from "react";
import dayjs from 'dayjs';

interface ContextProps {

}

interface Condition {
  date?: {
    year: number;
    month: number;
  },
  categoryId?: string
}

const context = createContext<ContextProps>({})

export const Provicer = context.Provider

export function initContext() {
  const [billList, setBillList] = useState<Bill[]>([])
  const [condition, setCondition] = useState<Condition>(null)

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
    const income = billListFilted.filter(bill => bill.type === BILL_TYPE.INCOME)
    const expenditure = billListFilted.filter(bill => bill.type === BILL_TYPE.EXPENDITURE)
    return { income, expenditure }
  }, [billListFilted])

  useEffect(() => {
    queryBillList().then(setBillList)
  }, [])

  return {
    billList: billListFilted,
    billListGroupByType,
    condition,
    setCondition
  }
}
