import { Bill, BillCategory } from './model';
import axios from 'axios';

export const API = {
  BASE_URL:'http://127.0.0.1:3000',
  BILL_LIST: '/bills',
  CATEGORY_LIST: '/categories',
}

export const queryBillList = async (): Promise<Bill[]> => {
  const resp = await axios.get(API.BILL_LIST,)
  return resp.data
}

export const queryCategoryList = async (): Promise<BillCategory[]> => {
  const resp = await axios.get(API.CATEGORY_LIST,)
  return resp.data
}

export const addBillItem = async (bill: Bill): Promise<Bill> => {
  const resp = await axios.post(API.BILL_LIST, bill)
  return resp.data
}
