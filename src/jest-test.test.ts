import { Bill } from './model';
import * as service from './service';

const {queryBillList}=service

// 启用 mock
jest.mock('./service')
const mockBillList: Bill[] = [{ time: 1, type: 1, amount: 1 }]

describe('用于检查 jest 功能 是否正常', () => {
  it('mock 自定义模块',async () => {
    jest.spyOn(service, 'queryBillList').mockResolvedValue(Promise.resolve(mockBillList))
    const billList= await queryBillList()
    expect(billList).toEqual(mockBillList)
  })
})
