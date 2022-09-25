import { Bill, BillCategory } from './model';
import { API } from './const';
import axios from 'axios';

export const getBillList = (): Promise<Bill[]> => {
  return new Promise((resolve, reject) => {
    axios.get(API.BILLS).then((resp) => {
      resolve(resp.data)
    }).catch(e => reject(e));
  })
}

export const getCategories=():Promise<BillCategory[]>=>{
  return new Promise((resolve,reject)=>{
    axios.get(API.CATEGORIES).then((resp) => {
      resolve(resp.data)
    }).catch(e=>reject(e));
  })
}
