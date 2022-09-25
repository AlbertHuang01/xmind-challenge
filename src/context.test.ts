import { getBillList } from './service';
import { appContextInit, getBillListByCondition } from './context';
import { renderHook } from '@testing-library/react-hooks';
describe('context.ts',()=>{
  it('getBillListByCondition',async()=>{
    const billList=await getBillList()
    expect(getBillListByCondition(billList,{
      months:null,
      category:null
    }).length).toEqual(4)

    expect(getBillListByCondition(billList,{
      months:null,
      category:'8s0p77c323'
    }).length).toEqual(1)
  })
})
