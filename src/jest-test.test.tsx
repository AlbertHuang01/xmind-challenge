import { Bill, BILL_TYPE } from './model';
import * as service from './service';
import { CheckAsync } from './demo'
import { render, fireEvent, act, waitFor } from '@testing-library/react'

const { queryBillList, queryCategoryList } = service

// 启用 mock
jest.mock('./service')
jest.useFakeTimers()

const mockBillList: Bill[] = [{ time: 1, type: 1, amount: 1 }]
const mockCategoryList = [
  { id: '1', name: '1', type: BILL_TYPE.INCOME },
  { id: '2', name: '2', type: BILL_TYPE.EXPENDITURE },
]

describe('用于检查 jest 功能 是否正常', () => {
  it('mock 自定义模块', async () => {
    jest.spyOn(service, 'queryBillList').mockResolvedValue(Promise.resolve(mockBillList))
    jest.spyOn(service, 'queryCategoryList').mockResolvedValue(Promise.resolve(mockCategoryList))

    const billList = await queryBillList()
    expect(billList).toEqual(mockBillList)

    const categoryList = await queryCategoryList()
    expect(categoryList).toEqual(mockCategoryList)
  })

  it('check NODE_ENV', () => {
    expect(process.env['NODE_ENV']).toBe('test')
  })

  it('<CheckAsync />', async () => {
    expect.assertions(1)
    const { getByTestId } = render(<CheckAsync />)
    const elShowButton = getByTestId('show-button')

    fireEvent.click(elShowButton)
    jest.runAllTimers()

    const elContent = getByTestId('content')
    expect(elContent.textContent).toBe('content')

  })
})
