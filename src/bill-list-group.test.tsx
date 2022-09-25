import { render } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { act } from "react-dom/test-utils"
import { GroupByCategoryType, GroupByIncomeAndExpenditure } from "./bill-list-group"
import { appContextInit, useAppContext } from "./context"
import { APP_DATA } from "./main"
import { getBillList } from "./service"

describe('bill-list-group',()=>{
  it('GroupByIncomeAndExpenditure snapshot',async()=>{
    const {waitForNextUpdate,result}=renderHook(()=>appContextInit())
    await waitForNextUpdate()

    const wrapper = ({ children }) => <APP_DATA.Provider value={result.current}>{children}</APP_DATA.Provider>

    const {baseElement}=render(<GroupByIncomeAndExpenditure/>,{wrapper})
    expect(baseElement).toMatchSnapshot()
  })
  // it('GroupByCategoryType snapshot',()=>{
  //   const {baseElement}=render(<GroupByCategoryType/>)
  //   expect(baseElement).toMatchSnapshot()
  // })
})
