import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { BILL_TYPE } from './contant';
import { Bill } from './model';
import * as service from './service';
import ReactDOM from 'react-dom';
import { App } from '.';
import { renderHook } from '@testing-library/react-hooks';
import { useAppContext } from './context';

jest.mock('./service')
jest.useFakeTimers()

const time = dayjs('2020-01-01')
// 填充一条当前日期的数据，为了能够再后续的测试中被查询到
const now = dayjs()
const mockBillList: Bill[] = [
  { time: time.valueOf(), type: BILL_TYPE.INCOME, amount: 1, category: '1' },
  { time: now.valueOf(), type: BILL_TYPE.EXPENDITURE, amount: 2, category: '2' },
]

describe('App', () => {
  beforeAll(() => {
    jest.spyOn(service, 'queryBillList').mockResolvedValue(Promise.resolve(mockBillList))
    jest.spyOn(service, 'queryCategoryList').mockResolvedValue(Promise.resolve([
      { id: '1', name: '1', type: BILL_TYPE.INCOME },
      { id: '2', name: '2', type: BILL_TYPE.EXPENDITURE },
    ]))
  })

  const fireKeyDownOnElement = (selector: string) => {
    let targetEl = document.querySelector(selector)
    fireEvent.keyDown(targetEl)
  }

  const getAntTableRows = () => {
    return document.querySelectorAll('.ant-table-tbody .ant-table-row')
  }

  /**
   * 判断月筛选是否生效
   * 1. 首先不筛选应该有两条数据
   * 2. 筛选后，条件不对应该没有数据
   * 3. 筛选条件正确，应该有一条数据
   */
  it('shoud months filter', async () => {
    render(<App />)
    expect.hasAssertions()

    // filter 1
    await waitFor(() => {
      expect(getAntTableRows()).toHaveLength(2)
    })

    // filter 2
    fireKeyDownOnElement('[id="months"]')

    let targetMonth = document.querySelector('[title="2022-01"]')
    fireEvent.click(targetMonth)

    await waitFor(() => {
      expect(getAntTableRows()).toHaveLength(0)
    })

    // filter 3
    fireKeyDownOnElement('[id="months"]')

    const year = now.year()
    const month = now.month() + 1
    targetMonth = document.querySelector(`[title="${year}-${month}"]`)
    fireEvent.click(targetMonth)

    await waitFor(() => {
      expect(getAntTableRows()).toHaveLength(1)
    })

  })

})

