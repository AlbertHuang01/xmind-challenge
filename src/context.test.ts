import { Bill } from './model';
import { renderHook } from '@testing-library/react-hooks';
import { initContext } from './context';
import * as service from './service';
import dayjs from 'dayjs';

// 启用 mock
jest.mock('./service')
const time = dayjs('2020-01-01')
const mockBillList: Bill[] = [{ time: time.valueOf(), type: 1, amount: 1, category: '1' }]

describe('initContext()', () => {
  jest.spyOn(service, 'queryBillList').mockResolvedValue(Promise.resolve(mockBillList))

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
      expect(result.current.billList).toEqual(mockBillList)

      result.current.setCondition({ date: { year: 2020, month: 1 }, categoryId: '1' })
      expect(result.current.billList).toEqual(mockBillList)
    })

  })

})
