import { Bill, BillCategory } from './model';
import axios from 'axios';

const API = {
  BILL_LIST: '/bill/list',
  CATEGORY_LIST: '/category/list',
}

export const queryBillList = async (): Promise<Bill[]> => {
  const resp = await axios.get(API.BILL_LIST,)
  return resp.data
}

export const queryCategoryList = async (): Promise<BillCategory[]> => {
  const resp = await axios.get(API.CATEGORY_LIST,)
  return resp.data
}
