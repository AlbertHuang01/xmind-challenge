import { appContextInit } from './context';
import { renderHook } from '@testing-library/react-hooks';
describe('context.ts',()=>{
  const billList= [
    {
      "type": 0,
      "time": 1561910400000,
      "category": "8s0p77c323",
      "amount": 5400
    },
    {
      "type": 0,
      "time": 1561910400000,
      "category": "0fnhbcle6hg",
      "amount": 1500
    },
    {
      "type": 0,
      "time": 1563897600000,
      "category": "3tqndrjqgrg",
      "amount": 3900
    },
    {
      "type": 0,
      "time": 1564502400000,
      "category": "bsn20th0k2o",
      "amount": 1900
    },

  ]

  /**
   * 先模拟 http
   * 再检查 billList
   */
  it('loadBillList',()=>{
    const {result:{current:{billList}}}=renderHook(()=>appContextInit())
  })
})
