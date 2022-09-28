import { render } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { GroupByCategoryType, GroupByIncomeAndExpenditure } from "./bill-list-group"
import { appContextInit } from "./context"
import { APP_DATA } from "./main"

describe('bill-list-group',()=>{
  it('GroupByIncomeAndExpenditure snapshot',async()=>{
    const {waitForNextUpdate,result}=renderHook(()=>appContextInit())
    await waitForNextUpdate()

    const wrapper = ({ children }) => <APP_DATA.Provider value={result.current}>{children}</APP_DATA.Provider>

    const {baseElement}=render(<GroupByIncomeAndExpenditure/>,{wrapper})
    expect(baseElement).toMatchSnapshot()
  })
  it('GroupByCategoryType snapshot',async()=>{
    const {waitForNextUpdate,result}=renderHook(()=>appContextInit())
    await waitForNextUpdate()

    const wrapper = ({ children }) => <APP_DATA.Provider value={result.current}>{children}</APP_DATA.Provider>

    const {baseElement}=render(<GroupByCategoryType/>,{wrapper})
    expect(baseElement).toMatchSnapshot()
  })
})
