// 账单类型常量
export const BILL_TYPE = {
  // 收入
  INCOME: 1,
  // 支出
  EXPENDITURE: 0,
};

// 账单
export interface Bill {
  time: number;
  type: number;
  // 账单详细分类id
  category?: string;
  amount: number;
}

// 账单详细分类
export interface BillCategory {
  id: string;
  name: string;
  type: number;
}
