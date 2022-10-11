import { Bill, BILL_TYPE } from './model';
import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react'
import { initContext } from './context';
import * as service from './service';
import dayjs from 'dayjs';

// 启用 mock
jest.mock('./service')
const time = dayjs('2020-01-01')
const mockBillList: Bill[] = [
  { time: time.valueOf(), type: BILL_TYPE.INCOME, amount: 1, category: '1' },
  { time: time.valueOf(), type: BILL_TYPE.EXPENDITURE, amount: 2, category: '2' },
]

describe('initContext()', () => {
  jest.spyOn(service, 'queryBillList').mockResolvedValue(Promise.resolve(mockBillList))
  jest.spyOn(service, 'addBillItem').mockResolvedValue(Promise.resolve(mockBillList[0]))
  jest.spyOn(service, 'queryCategoryList').mockResolvedValue(Promise.resolve([
    { id: '1', name: '1', type: BILL_TYPE.INCOME },
    { id: '2', name: '2', type: BILL_TYPE.EXPENDITURE },
  ]))


  it('test condition with setCondition', () => {
    const { result } = renderHook(() => initContext())
    expect(result.current.condition).toBeNull()
    const condition = { date: { year: 2020, month: 1 } }

    result.current.setCondition(condition)
    expect(result.current.condition).toBe(condition)

    result.current.setCondition(null)
    expect(result.current.condition).toBeNull()
  })

  describe('billList', () => {

    it('should not be billListFilted', async () => {
      const { result, waitForNextUpdate } = renderHook(() => initContext())
      // 等待下一次的异步更新完成
      await waitForNextUpdate()
      expect(result.current.billList).toEqual(mockBillList)
    })

    it('should be billListFilted', async () => {
      const { result, waitForNextUpdate } = renderHook(() => initContext())

      result.current.setCondition({ date: { year: 2020, month: 2 } })
      await waitForNextUpdate()
      expect(result.current.billList).toEqual([])

      result.current.setCondition({ date: { year: 2020, month: 1 } })
      expect(result.current.billList).toEqual(mockBillList)

      result.current.setCondition({ categoryId: '6' })
      expect(result.current.billList).toEqual([])

      result.current.setCondition({ categoryId: '1' })
      expect(result.current.billList[0]).toEqual(mockBillList[0])

      result.current.setCondition({ date: { year: 2020, month: 1 }, categoryId: '1' })
      expect(result.current.billList[0]).toEqual(mockBillList[0])
    })

    it('should group by type', async () => {
      const { result, waitForNextUpdate } = renderHook(() => initContext())
      await waitForNextUpdate()
      expect(result.current.billListGroupByType.income).toEqual(1)
      expect(result.current.billListGroupByType.expenditure).toEqual(2)

      result.current.setCondition({ date: { year: 2020, month: 2 } })
      expect(result.current.billListGroupByType.income).toEqual(0)
      expect(result.current.billListGroupByType.expenditure).toEqual(0)

    })

    it('billListGroupByType', async () => {
      const { result, waitForNextUpdate } = renderHook(() => initContext())
      await waitForNextUpdate()
      expect(result.current.billListGroupByType.income).toEqual(1)
      expect(result.current.billListGroupByType.expenditure).toEqual(2)

      result.current.setCondition({ date: { year: 2020, month: 2 } })
      expect(result.current.billListGroupByType.income).toEqual(0)
      expect(result.current.billListGroupByType.expenditure).toEqual(0)

    })

    it('billListGroupByCategory', async () => {
      const { result, waitForNextUpdate } = renderHook(() => initContext())
      await waitForNextUpdate()

      expect(result.current.billListGroupByCategory).toEqual([
        { name: '1', totalAmount: 1 },
        { name: '2', totalAmount: 2 },
      ])

      result.current.setCondition({ date: { year: 2020, month: 2 } })
      expect(result.current.billListGroupByCategory).toEqual([{ name: '1', totalAmount: 0 },
      { name: '2', totalAmount: 0 },])

    })

    it('should add bill', async () => {
      const index = 0
      const { result, waitForNextUpdate } = renderHook(() => initContext())
      await waitForNextUpdate()
      await result.current.addBill(mockBillList[index])
      expect(service.addBillItem).toBeCalledWith(mockBillList[index])
      expect(service.queryBillList).toBeCalled()
    })
  })

})
