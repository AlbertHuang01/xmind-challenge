import ReactDOM from "react-dom";
import { BillList, BillListGroup, SearchForm } from './index';
import * as context from './context'
import dayjs from "dayjs";
import { BILL_TYPE } from "./contant";
import { render ,screen } from "@testing-library/react";

jest.mock('./contant')

describe('<SearchForm />', () => {
  it('renders without crashing', () => {
    jest.spyOn(context, 'useAppContext').mockImplementation(() => {
      return {
        categoryList: []
      } as unknown as context.ContextProps
    })

    const div = document.createElement('div');
    ReactDOM.render(<SearchForm />, div);

    const elMonths = div.querySelectorAll('input[id="months"]');
    expect(elMonths).toHaveLength(1)

    const elCategory = div.querySelectorAll('input[id="category"]');
    expect(elCategory).toHaveLength(1)

    const elSearchButton = div.querySelectorAll('[data-testid="search-button"]');
    expect(elSearchButton).toHaveLength(1)
  });

  it('will called setCondition',()=>{
    const setCondition = jest.fn()

    jest.spyOn(context, 'useAppContext').mockImplementation(() => {
      return {
        setCondition,
        categoryList: [
          { id: '1', name: '1', type: BILL_TYPE.INCOME },
        ]
      } as unknown as context.ContextProps
    })

    render(<SearchForm openDatePicker openCategorySelect/>);

    (document.querySelector('[title="2022-01"]') as HTMLTableCellElement)?.click()

    expect(setCondition).toBeCalledWith({
      date:{
        year:2022,
        month:1,
      }
    })

  })
})

it('<BillList />', () => {
  const time = dayjs('2020-01-01')

  jest.spyOn(context, 'useAppContext').mockImplementation(() => {
    return {
      billList: [
        { time: time.valueOf(), type: BILL_TYPE.INCOME, amount: 1, category: '1' },
        { time: time.valueOf(), type: BILL_TYPE.EXPENDITURE, amount: 2, category: '2' },
      ],
      categoryList: [
        { id: '1', name: '1', type: BILL_TYPE.INCOME },
        { id: '2', name: '2', type: BILL_TYPE.EXPENDITURE },
      ]
    } as unknown as context.ContextProps
  })
  const { baseElement } = render(<BillList />)
  const elTr = baseElement.querySelector('.ant-table-tbody tr')
  const elTds = elTr.querySelectorAll('td')

  expect(elTds[0].textContent).toBe('2020-01-01 00:00:00')
  expect(elTds[1].textContent).toBe('收入')
  expect(elTds[2].textContent).toBe('1')
  expect(elTds[3].textContent).toBe('1')
})

it('<BillListGroup />', () => {
  jest.spyOn(context, 'useAppContext').mockImplementation(() => {
    return {
      billListGroupByType: {
        income:1,
        expenditure:2
      },
      billListGroupByCategory: [
        { name: '1', totalAmount: 1 },
        { name: '2', totalAmount: 2 },
      ]
    } as unknown as context.ContextProps
  })

  const { getByTestId,getAllByTestId } = render(<BillListGroup />)
  expect(getByTestId('income').textContent).toBe('收入：1 ￥')
  expect(getByTestId('expenditure').textContent).toBe('支出：2 ￥')
  expect(getAllByTestId('bill-group-item').length).toBe(2)
})
