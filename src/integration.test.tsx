import { render, fireEvent } from '@testing-library/react';
import dayjs from 'dayjs';
import { BILL_TYPE } from './contant';
import { Bill } from './model';
import * as service from './service';
import ReactDOM from 'react-dom';
import { App } from '.';

jest.mock('./service')

const time = dayjs('2020-01-01')
const mockBillList: Bill[] = [
  { time: time.valueOf(), type: BILL_TYPE.INCOME, amount: 1, category: '1' },
  { time: time.valueOf(), type: BILL_TYPE.EXPENDITURE, amount: 2, category: '2' },
]

describe('App', () => {
  beforeAll(()=>{
    jest.spyOn(service, 'queryBillList').mockResolvedValue(Promise.resolve(mockBillList))
    jest.spyOn(service, 'queryCategoryList').mockResolvedValue(Promise.resolve([
      { id: '1', name: '1', type: BILL_TYPE.INCOME },
      { id: '2', name: '2', type: BILL_TYPE.EXPENDITURE },
    ]))
  })

  // it('should condition change',()=>{
  //   const { baseElement } = render(<App />)
  //   const monthsEl = baseElement.querySelector('[id="months"]')
  //   fireEvent.change(monthsEl, { target: { value: '2000-01' } })
  // })

  // it('shoud months filter', (done) => {
  //   const { baseElement } = render(<App />)
  //   let antTableRows = null
  //   process.nextTick(() => {
  //     antTableRows = baseElement.querySelectorAll('.ant-table-tbody .ant-table-row')
  //     expect(antTableRows).toHaveLength(2)
  //   })

  //   const monthsEl = baseElement.querySelector('[id="months"]')
  //   fireEvent.change(monthsEl, { target: { value: '2000-01' } })
  //   process.nextTick(() => {
  //     antTableRows = baseElement.querySelectorAll('.ant-table-tbody .ant-table-row')
  //     expect(antTableRows).toHaveLength(0)
  //     done()
  //   })
  // })

})

